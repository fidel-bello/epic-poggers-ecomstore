import { Product } from "../models/product";
import {Request, Response, NextFunction} from "express";
import { Error_Handler } from "../utils/errorHandling";
import asyncError from "../middlewares/asyncError";
import { Api_Features }   from "../utils/apiFeatures";

export class Product_Controllers
 {
    //create products
    public createProducts = asyncError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        req.body.user = req.body.id

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        })
    })


    public getProducts = asyncError(async(req: Request, res: Response, next: NextFunction): Promise<void> => {    //get_products 

        const resultsPerPage = 4;
        const filteredSearch = new Api_Features(Product.find(), req.query)
            .search()
            .pagination(resultsPerPage);

        const products = await filteredSearch.query;

        res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    })


    public getSingleProduct = asyncError(async (req: Request, res: Response, next: NextFunction): Promise<void> => { //get single product with id assigned by mongoose

        const product = await Product.findById(req.params.id);

        if(!product)
            return next(new Error_Handler('Product not found', 404));

        res.status(200).json({
            success: true,
            product
        })
    })

    public updateProduct = asyncError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        let product = await Product.findById(req.params.id);

        if (!product)
            return next(new Error_Handler('Product not found', 404));
        
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            success: true,
            product,
        })

    })


    
    public deleteProduct = asyncError(async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const product = await Product.findByIdAndRemove(req.params.id);

        if(!product)
            return next(new Error_Handler('Product not found', 404));

        res.status(200).json({
            success: true,
            message: 'Product deleted'
        })

    })

   
};