/* eslint-disable object-property-newline */
/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
import {Schema, Document, Model, model, Types} from 'mongoose';
import { IUser } from './user';

export interface IProducts extends Document {
  name: string;
  price: number;
  description: string;
  ratings: number;
  images: Types.DocumentArray<images>;
  category: string;
  seller: string;
  stock: number;
  numOfReviews: number;
  reviews: reviews[];
  user: IUser['_id'];
  createdAt: Date;
}
interface images {
  public_id: string;
  url: string;
}
interface reviews {
  user: IUser['_id'];
  name: string;
  rating: number;
  comment: string
}
const productSchema: Schema = new Schema({
  name: { type: String, required: [true, 'Please enter product name'], trim: true, maxLength: [100, 'Product name cannot exceed 100 characters'] },
  price: { type: Number, required: [true, 'Please enter product price'], maxLength: [5, 'Product name cannot exceed 5 characters'], default: 0.0 },
  description: { type: String, required: [true, 'Please enter product description'] },
  ratings: { type: Number, default: 0 },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true } },
  ],
  category: { type: String, required: [true, 'Please select category for this product'],
    enum: {
      values: [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home',
      ],
      message: 'Please select correct category for product',
    },
  },
  seller: { type: String, required: [true, 'Please enter product seller'] },
  stock: { type: Number, required: [true, 'Please enter product stock'], maxLength: [5, 'Product name cannot exceed 5 characters'], default: 0 },
  numOfReviews: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: Types.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  user: { type: Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Product: Model<IProducts> = model('Product', productSchema);
