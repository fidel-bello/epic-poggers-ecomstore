import express from 'express';
import product_router from "./productRoutes";

const router = express.Router();

router.use('/v1', product_router);
export default router;