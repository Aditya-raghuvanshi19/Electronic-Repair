import { Router } from 'express';
import {
  getServices,
  createService,
  deleteService,
  getServicesByVendorId
} from '../controllers/service.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = Router();

router.get('/', getServices);
router.get('/vendor/:id', getServicesByVendorId);
router.post('/create', authMiddleware, createService);
router.delete('/:id', authMiddleware, adminMiddleware, deleteService);

export default router;