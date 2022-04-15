import { Product } from "../models/product";

export class Product_Controllers 
{
    //create products
    public createProducts = async (req: any, res: any, next: any) => {
        Product.create(req.body);
        res.status(201).json({
            success: true,
            Product
        })
    };

    //get_products 
    public getProducts = async(req:any, res:any, next:any) => {

        const products = await Product.find();
        
        res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    };


}