import mongoose, {
  Schema,
  Model,
  model,
} from 'mongoose';
import { IOrder } from '../interface/Iorder';

const orderSchema: Schema = new Schema({
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    phoneNo: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  user: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Product' },
    },
  ],
  paymentInfo: {
    id: { type: String },
    status: { type: String },
  },
  paidAt: { type: Date },
  itemsPrice: { type: Number, required: true, default: 0.0 },
  taxPrice: { type: Number, required: true, default: 0.0 },
  shippingPrice: { type: Number, required: true, default: 0.0 },
  totalPrice: { type: Number, required: true, default: 0.0 },
  orderStatus: { type: String, required: true, default: 'Processing' },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Order: Model<IOrder> = model('Order', orderSchema);
