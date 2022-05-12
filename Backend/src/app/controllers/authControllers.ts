import asyncError from "../middlewares/asyncError";
import { NextFunction, Request, Response } from "express";
import { Error_Handler } from "../utils/errorHandling";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { sendToken } from "../middlewares/jwtToken";


export class Auth_Controllers
{
    public registerUser = asyncError( async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const {email, password, name } = req.body;

        const user = await User.create({
            name,
            password,
            email
        })

        sendToken(user, 200, res);
    })


    public loginUser = asyncError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email, password, name } = req.body;

        if(!email || !password)
            return next(new Error_Handler('Please enter email & password', 400));

        const user = await User.findOne({ email }).select('+password');

        if(!user)
            return next(new Error_Handler('Invalid Email or Password. Please try again', 401));

        const isPassword = await user.comparePassword(password);

        if(!isPassword)
            return next(new Error_Handler('Invalid email or password', 400));

        
        sendToken(user, 200, res);
    })

    public isAuthenticated = asyncError(async (req: any, res: Response, next: NextFunction) => {
    
        const { token } = req.cookies;
    
        if(!token)
            return next(new Error_Handler('Must login to access this route', 401)); // if there is no token the return error class 401 status with message 
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token from the secret 
    
        req.user = await User.findById(decoded.id); //find the token
    
        next();
    
    })
};