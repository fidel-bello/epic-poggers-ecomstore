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
        res.status(201).json({
            success: true,
            msg: 'Products will be found here'
        })
    };


}