import { Product } from "../models/product";

export class Product_Controllers 
{
    //create products
    public createProducts = async (req: any, res: any, next: any): Promise<void> => {
        Product.create(req.body);
        res.status(201).json({
            success: true,
            Product
        })
    };

    //get_products 
    public getProducts = async(req:any, res:any, next:any): Promise<void> => {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    };

    //get single product with id assigned by mongoose
    public getSingleProduct = async (req:any, res:any, next:any): Promise<void> => {
        
        const product = await Product.findById(req.params.id);

        if(!product)
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })

        res.status(200).json({
            success: true,
            product
        })
    }

}