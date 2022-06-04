/* eslint-disable camelcase */
import express from 'express';
import product_router from './productRoutes';
import auth_router from './authRoutes';
import order_router from './orderRoutes';

const router = express.Router();

router.use('/v1', product_router);
router.use('/v1', auth_router);
router.use('/v1/', order_router);

export default router;
