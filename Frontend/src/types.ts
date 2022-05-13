export type Image = {
  public_id: string;
  url: string;
  _id: string;
}

export type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  ratings: number;
  images: Image[];
  category: string;
  seller: string;
  stock: number;
  numOfReviews: number;
  reviews: any[];
  createdAt: Date;
  __v: number;
}
