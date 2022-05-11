import { Response } from "express";



export const sendToken = (user: any, statusCode: number, res: Response) => {
    const token = user.getToken();

    const expire = 7 * 15 * 60 * 1000;


    const options = {
        expires: new Date(Date.now() + expire),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        message: `Welcome Back ${user.name}`,
        token,
        user
    });

}