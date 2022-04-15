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


    public getProducts = async(req:any, res:any, next:any): Promise<void> => {    //get_products 

        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            products
        })
    };

    
    public getSingleProduct = async (req:any, res:any, next:any): Promise<void> => { //get single product with id assigned by mongoose
        
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

    public updateProduct = async(req:any, res:any, next:any): Promise<void> => {

        let product = await Product.findById(req.params.id);

        if(!product)
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            product,
        })

    }

}