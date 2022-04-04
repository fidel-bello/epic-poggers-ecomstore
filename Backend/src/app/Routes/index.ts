import express from 'express';
import healthRouter from './healthCheck';
const router = express.Router();

router.use('/v1', healthRouter);

export default router;