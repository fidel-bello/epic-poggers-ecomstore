/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import { Order } from '../models/orders';
import asyncError from '../middlewares/asyncError';
import { Error_Handler } from '../utils/errorHandling';
import { updateStock } from '../middlewares/jwtToken';

export class Order_Controllers {
  public createOrder = asyncError(async (req: any, res: Response, _next: NextFunction): Promise<void> => {
    const {
      // eslint-disable-next-line no-shadow
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
    });
    res.status(200).json({
      success: true,
      createOrd,
    });
  });

  public getSingleOrder = asyncError(async (req:Request, res:Response, next:NextFunction) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return next(new Error_Handler('Order is not found', 404));
    res.status(200).json({
      success: true,
      order,
    });
  });

  public myOrders = asyncError(async (req:any, res:Response, _next:NextFunction) => {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      orders,
    });
  });

  public getOrders = asyncError(async (_req:Request, res:Response, _next: NextFunction) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });

  public updateProcessOrders = asyncError(async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id);
    if (order!.orderStatus === 'Delivered') return next(new Error_Handler('Already Delivered', 400));
    order?.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });
    (order!.orderStatus = req.body.status), (order!.deliveredAt = new Date(Date.now()));
    await order!.save();
    res.status(200).json({
      success: true,
    });
  });

  public deleteOrder = asyncError(async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id);
    if (!order) return next(new Error_Handler('Order is not found', 404));
    await order.remove();
    res.status(200).json({
      sucess: true,
      message: 'Order deleted',
    });
  });
}
