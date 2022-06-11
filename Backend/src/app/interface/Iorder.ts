import { Document } from 'mongoose';
import { IUser } from './Iuser';
import { IProducts } from './Iproducts';

export interface IOrder extends Document {
    shippingInfo: {
      address: string,
      city: string,
      phoneNo: string,
      postalCode: string,
      country: string
    },
    user: IUser['_id'],
    orderItems: orderItems[],
    paymentInfo: {
      id: string,
      status: string,
    }
    paidAt: Date,
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    orderStatus: String,
    deliveredAt: Date,
    createdAt: Date
  }

export interface orderItems extends IOrder {
    name: string,
    quantity: number,
    image: string,
    price: number,
    product: IProducts['_id'],
}
