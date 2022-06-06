/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import cryto from 'crypto';
// eslint-disable-next-line import/no-extraneous-dependencies
import config from 'config';
import asyncError from '../middlewares/asyncError';
import { Error_Handler } from '../utils/errorHandling';
import { User, Role, IUser } from '../models/user';
import { sendEmail, sendToken } from '../middlewares/jwtToken';

export class Auth_Controllers {
  static readonly UserRole = Role;

  readonly UserRole = Auth_Controllers.UserRole;

  userRole!: Role;

  private _mailHost: string;

  private _mailPort: string;

  private _mailUser: string;

  private _mailPassword: string;

  private _fromMail: string;

  private _fromName: string;

  constructor(init?: Partial<Auth_Controllers>) {
    Object.assign(this, init);

    this._mailHost = config.get('MAIL_HOST');
    this._mailPort = config.get('MAIL_PORT');
    this._mailPassword = config.get('MAIL_PASSWORD');
    this._mailUser = config.get('MAIL_USER');
    this._fromName = config.get('FROM_NAME');
    this._fromMail = config.get('FROM_EMAIL');
  }

  public set mailPort(mailPort: string) {
    this._mailPort = mailPort;
  }

  public get mailPort(): string {
    return this._mailPort;
  }

  public set mailHost(mailPort: string) {
    this._mailPort = mailPort;
  }

  public get mailHost(): string {
    return this._mailHost;
  }

  public set mailUser(mailUser: string) {
    this._mailUser = mailUser;
  }

  public get mailUser(): string {
    return this._mailUser;
  }

  public set mailPassword(mailPassword: string) {
    this._mailPassword = mailPassword;
  }

  public get mailPassword(): string {
    return this._mailPassword;
  }

  public set fromEmail(fromEmail: string) {
    this._fromMail = fromEmail;
  }

  public get fromEmail(): string {
    return this._fromMail;
  }

  public set fromName(fromName: string) {
    this._fromName = fromName;
  }

  public get fromName(): string {
    return this._fromName;
  }

  public registerUser = asyncError(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const { email, password, name } = req.body;

    const user = await User.create({
      name,
      password,
      email,
    });

    sendToken(user, 200, res);
  });

  public loginUser = asyncError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password, name } = req.body;

    if (!email || !password) return next(new Error_Handler('Please enter email & password', 400));

    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new Error_Handler('Invalid Email or Password. Please try again', 401));

    const isPassword = await user.comparePassword(password);

    if (!isPassword) return next(new Error_Handler('Invalid email or password', 400));

    sendToken(user, 200, res);
  });

  public isAuthenticated = asyncError(async (req: any, _res: Response, next: NextFunction): Promise<void> => {
    const { token } = req.cookies;

    if (!token) return next(new Error_Handler('Must login to access this route', 401)); // if there is no token the return error class 401 status with message

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token from the secret

    req.user = await User.findById(decoded.id); // find the token

    next();
  });

  public logoutUser = asyncError(async (_req: any, res: Response, _next: NextFunction): Promise<void> => {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged out',
    });
  });

  public authorizeRoles = (...roles: Role[]) => (req: any, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error_Handler(`Role "${req.user.role}" is not allowed to access this route`, 403));
    }
    next();
  };

  public getUserProfile = asyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new Error_Handler(`user does not match id: ${req.params.id}`, 404));

    res.status(200).json({
      success: true,
      user,
    });
  });

  public forgotPassword = asyncError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new Error_Handler('Email does not exist', 404));

    const resetToken = user.generateResetPassowrd();

    await user.save({ validateBeforeSave: false });

    const url = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Your reset token. Click the url: \n\n${url}\n\nif you did not request this, please ignore`;
    try {
      await sendEmail({
        email: user.email,
        subject: 'Poggers Password Recovery',
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email, sent to: ${user.email}`,
      });
    } catch (error) {
      await user.save({ validateBeforeSave: false });

      return next(new Error_Handler(error.message, 500));
    }
  });

  public resetPassword = asyncError(async (req: Request, res: Response, next: NextFunction) => {
    const resetPasswordToken = cryto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return next(new Error_Handler('Password reset token is invalid or has been expired', 400));

    if (req.body.password !== req.body.confirmPassword) return next(new Error_Handler('Passwords do not match', 400));

    user.password = req.body.password;

    await user.save();

    sendToken(user, 200, res);
  });

  public updatePassword = asyncError(async (req: any, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id).select('+password');

    const match = user!.comparePassword(req.body.oldPassword); // compare passwords

    if (!match) return next(new Error_Handler('Old Password is incorrect', 400));

    user!.password = req.body.password; // password is new input

    await user!.save();

    sendToken(user, 200, res);
  });

  public updateUser = asyncError(async (req: any, res: Response, _next: NextFunction) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
    });
  });

  public adminGetAllRoutes = asyncError(async (_req: Request, res: Response, _next: NextFunction) => {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  });
}
