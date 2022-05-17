import asyncError from "../middlewares/asyncError";
import { NextFunction, Request, Response } from "express";
import { Error_Handler } from "../utils/errorHandling";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { sendToken } from "../middlewares/jwtToken";


enum UserRole
{
    Admin = 'admin',
    User = 'user',
}

export class Auth_Controllers {

    static readonly UserRole = UserRole;

    readonly UserRole = Auth_Controllers.UserRole;

    userRole!: UserRole; 

    constructor(init?: Partial<Auth_Controllers>){
        Object.assign(this, init);
    }



    public registerUser = asyncError(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {

        const { email, password, name } = req.body;

        const user = await User.create({
            name,
            password,
            email
        })

        sendToken(user, 200, res);
    })


    public loginUser = asyncError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email, password, name } = req.body;

        if (!email || !password)
            return next(new Error_Handler('Please enter email & password', 400));

        const user = await User.findOne({ email }).select('+password');

        if (!user)
            return next(new Error_Handler('Invalid Email or Password. Please try again', 401));

        const isPassword = await user.comparePassword(password);

        if (!isPassword)
            return next(new Error_Handler('Invalid email or password', 400));


        sendToken(user, 200, res);
    })

    public isAuthenticated = asyncError(async (req: any, _res: Response, next: NextFunction): Promise<void> => {

        const { token } = req.cookies;

        if (!token)
            return next(new Error_Handler('Must login to access this route', 401)); // if there is no token the return error class 401 status with message 

        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token from the secret 

        req.user = await User.findById(decoded.id); //find the token

        next();

    })


    public logoutUser = asyncError(async (_req: any, res: Response, _next: NextFunction): Promise<void> => {

        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: "Logged out"
        })
    })

    public authorizeRoles = (...roles: UserRole[]) =>  {
        return (req: Request, res:Response, next: NextFunction) => {
            if(!roles.includes(req.user.role))
               return next(new Error_Handler(`Role: "${req.user.role}" is not allowed to access this route`, 403));
        }
    }
};