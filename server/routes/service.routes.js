import { Router } from 'express';
import { 
  getServices, 
  createService, 
  deleteService 
} from '../controllers/service.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = Router();

router.get('/', getServices);
router.post('/', authMiddleware, adminMiddleware, createService);
router.delete('/:id', authMiddleware, adminMiddleware, deleteService);

export default router;