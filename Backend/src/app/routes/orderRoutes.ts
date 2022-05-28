import express from 'express';
import { Auth_Controllers } from '../controllers/authControllers';
import { Order_Controllers } from '../controllers/orderControllers';

const order = new Order_Controllers();
const user = new Auth_Controllers();
const router = express.Router();

router.route('/orders/new').post(user.isAuthenticated, order.createOrder);
export default router;