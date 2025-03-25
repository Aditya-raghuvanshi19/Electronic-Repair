import { Router } from 'express';
import { processPayment, getPaymentDetails } from '../controllers/payment.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, processPayment);
router.get('/:id', authMiddleware, getPaymentDetails);

export default router;