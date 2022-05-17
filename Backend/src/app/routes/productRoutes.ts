import { Product_Controllers } from "../controllers/productController";
import express from "express"
import { Auth_Controllers } from "../controllers/authControllers";

const router = express.Router();
const Product = new Product_Controllers();
const User = new Auth_Controllers();

router.route('/products').get(Product.getProducts);
router.route('/products/:id').get(Product.getSingleProduct);

//admin routes
router.route('/admin/products/:id')
    .put(User.isAuthenticated, User.authorizeRoles(User.UserRole.admin) , Product.updateProduct)
    .delete(User.isAuthenticated, User.authorizeRoles(User.UserRole.admin), Product.deleteProduct); //could be wrong format? did this because the admin product id route is used twice

router.route('/admin/products/new').post(User.isAuthenticated, User.authorizeRoles(), Product.createProducts);

export default router