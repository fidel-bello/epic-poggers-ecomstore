import { Product_Controllers } from "../controllers/productController";
import express from "express"

const router = express.Router();
const Product = new Product_Controllers();

router.route('/products').get(Product.getProducts);
router.route('/products/new').post(Product.createProducts);

export default router