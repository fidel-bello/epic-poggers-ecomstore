import asyncError from "../middlewares/asyncError";
import { NextFunction, Request, Response } from "express";
import { Error_Handler } from "../utils/errorHandling";
import { User } from "../models/user";

export class Auth_Controllers
{
    public registerUser = asyncError( async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {email, password, name } = req.body;
        const user = await User.create({
            name,
            password,
            email
        })

        const token = user.getToken();

        res.status(201).json({
            success: true,
            token
        })
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

        const token = user.getToken();

        res.status(200).json({
            success: true,
            message: `Welcome ${user.name}!`,
            token
        })
    })

};