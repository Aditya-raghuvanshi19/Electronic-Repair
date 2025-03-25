import { Router } from 'express';
import { createReview, getServiceReviews } from '../controllers/review.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createReview);
router.get('/:serviceId', getServiceReviews);

export default router;