/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/product';
import { IProducts } from '../interface/Iproducts';
import { Error_Handler } from '../utils/errorHandling';
import asyncError from '../middlewares/asyncError';
import { Api_Features } from '../utils/apiFeatures';

export class Product_Controllers {
  public createProducts = asyncError(async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    req.body.user = req.body.id;
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  });

  public getProducts = asyncError(async (req: any, res: Response, _next: NextFunction): Promise<void> => {
    // get_products
    const resPerPage = 4;
    const productCount = await Product.countDocuments();
    const apiFeatures = new Api_Features(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resPerPage);
    let products = await apiFeatures.query;
    const filteredProductsCount = products.length;
    products = await apiFeatures.query.clone();
    res.status(200).json({
      success: true,
      productCount,
      resPerPage,
      filteredProductsCount,
      products,
    });
  });

  public getSingleProduct = asyncError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // get single product with id assigned by mongoose
    const product = await Product.findById(req.params.id);
    if (!product) return next(new Error_Handler('Product not found', 404));
    res.status(200).json({
      success: true,
      product,
    });
  });

  public updateProduct = asyncError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let product = await Product.findById(req.params.id);
    if (!product) return next(new Error_Handler('Product not found', 404));
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  });

  public deleteProduct = asyncError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return next(new Error_Handler('Product not found', 404));
    res.status(200).json({
      success: true,
      message: 'Product deleted',
    });
  });

  public createReview = asyncError(async (req: any, res: Response, next: NextFunction): Promise<void> => {
    const {
      comment,
      productId,
      rating,
    } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    };
    const product = await Product.findById(productId) as IProducts;
    const isReviewed = product.reviews.find((reviews) => reviews.user.toString() === req.user._id.toString());
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          // eslint-disable-next-line no-unused-expressions
          rev.comment = comment;
          rev.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    // adds all ratings from the items and divides by the length of review
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true
    });
  });

  public getReviews = asyncError(async (req: any, res: Response, _next: NextFunction):Promise<void> => {
    const product = await Product.findById(req.query.id) as IProducts;
    res.status(200).json({
      success: true,
      reviews: product.reviews
    });
  });
}
