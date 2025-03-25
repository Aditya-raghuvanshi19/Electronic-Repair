import { Router } from 'express';
import { createRepair, getRepair, updateRepairStatus } from '../controllers/repair.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = Router();

router.post('/', authMiddleware, createRepair);
router.get('/:id', authMiddleware, getRepair);
router.put('/:id/status', authMiddleware, adminMiddleware, updateRepairStatus);

export default router;