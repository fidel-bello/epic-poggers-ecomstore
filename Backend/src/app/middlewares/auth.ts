/*
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken"
import { User } from "../models/user";
import { Error_Handler } from "../utils/errorHandling";
import asyncError from "./asyncError";

export const isAuthenticated = asyncError(async (req: any, res: Response, next: NextFunction) => {
    
    const { token } = req.cookies;

    if(!token)
        return next(new Error_Handler('Must login to access this route', 401)); // if there is no token the return error class 401 status with message 

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token from the secret 

    req.user = await User.findById(decoded.id); //find the token

    next();

})
*/