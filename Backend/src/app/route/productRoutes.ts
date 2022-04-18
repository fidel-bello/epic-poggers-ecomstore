import { Product_Controllers } from "../controllers/productController";
import express from "express"

const router = express.Router();
const Product = new Product_Controllers();

router.route('/products').get(Product.getProducts);
router.route('/products/:id').get(Product.getSingleProduct);

//admin routes
router.route('/admin/products/:id')
    .put(Product.updateProduct)
    .delete(Product.deleteProduct); //could be wrong format? did this because the admin product id route is used twice

router.route('/admin/products/new').post(Product.createProducts);

export default router