import { Order } from "../models/orders";
import asyncError from "../middlewares/asyncError";
import {NextFunction, Response, Request } from 'express';
import { Error_Handler } from "../utils/errorHandling";

export class Order_Controllers {

    public createOrder = asyncError( async(req: any, res: Response, _next: NextFunction): Promise<void> => {
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

    public getSingleOrder = asyncError(async( req:Request, res:Response, next:NextFunction) => {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if(!order)
            return next(new Error_Handler('Order is not found', 404));
        res.status(200).json({
            success: true,
            order
        })
    })

    public myOrders = asyncError(async(req:any, res:Response, _next:NextFunction) => {
        const orders = await Order.find({ user: req.user.id })
        res.status(200).json({
            success: true,
            orders
        })
    })

    public getOrders = asyncError(async(_req:Request, res:Response, _next: NextFunction) => {
        const orders = await Order.find();
        res.status(200).json({
            success: true,
            orders
        })
    })

}