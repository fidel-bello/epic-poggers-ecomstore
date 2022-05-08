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

};