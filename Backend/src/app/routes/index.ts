import express from 'express';
import product_router from "./productRoutes";
import auth_router from "./authRoutes";

const router = express.Router();

router.use('/v1', product_router);
router.use('/v1', auth_router);
export default router;