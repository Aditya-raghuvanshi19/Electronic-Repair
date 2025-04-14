import { Router } from 'express';
import {
  getServices,
  createService,
  deleteService,
  getServicesByVendorId,
  authorizeService,
  getAllServices
} from '../controllers/service.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = Router();

router.get('/', getServices);
router.get('/getAll', getAllServices);
router.get('/vendor/:id', getServicesByVendorId);
router.post('/create', authMiddleware, createService);
router.delete('/:id', authMiddleware, adminMiddleware, deleteService);
router.post('/authorize', authMiddleware, adminMiddleware, authorizeService);
export default router;