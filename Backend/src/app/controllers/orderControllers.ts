import { Order } from "../models/orders";
import asyncError from "../middlewares/asyncError";
import {NextFunction, Response } from 'express';

export class Order_Controllers {

    public createOrder = asyncError( async(req: any, res: Response, _next: NextFunction) => {
        const { 
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,

        } = req.body;

        const createOrd = await Order.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user._id,
        })

        res.status(200).json({
            success: true,
            createOrd
        })
    })

}