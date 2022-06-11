import { Types, Document } from 'mongoose';
import { IUser } from './Iuser';

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
    reviews: Types.DocumentArray<reviews>;
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
    comment: string;
}
