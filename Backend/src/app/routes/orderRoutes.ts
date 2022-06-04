/* eslint-disable camelcase */
import express from 'express';
import { Auth_Controllers } from '../controllers/authControllers';
import { Order_Controllers } from '../controllers/orderControllers';
import { Role } from '../models/user';

const order = new Order_Controllers();
const user = new Auth_Controllers();
const admin = Role.Admin;
const router = express.Router();

router.route('/orders/new').post(user.isAuthenticated, order.createOrder);
router.route('/order/:id').get(order.getSingleOrder);
router.route('/orders/user').get(user.isAuthenticated, order.myOrders);

router.route('/admin/orders').get(user.isAuthenticated, user.authorizeRoles(admin), order.getOrders);
router.route('/admin/order/:id')
  .put(user.isAuthenticated, user.authorizeRoles(admin), order.updateProcessOrders)
  .delete(user.isAuthenticated, user.authorizeRoles(admin), order.deleteOrder);
export default router;
