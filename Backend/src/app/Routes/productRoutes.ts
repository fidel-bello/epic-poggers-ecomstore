import { Product_Controllers } from "../controllers/productController";
import express from "express"

const router = express.Router();
const Product = new Product_Controllers();

router.route('/products').get(Product.getProducts);
router.route('/products/:id').get(Product.getSingleProduct);

//admin routes
router.route('/admin/products/:id').put(Product.updateProduct);
router.route('/admin/products/new').post(Product.createProducts);

export default router