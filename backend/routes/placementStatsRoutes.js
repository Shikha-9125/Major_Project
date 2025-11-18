import express from 'express';
import {
  getAllStats,
  getStatsByBatch,
  getActiveStats,
  createOrUpdateStats,
  deleteStats
} from '../controllers/placementStatsController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllStats);
router.get('/active', getActiveStats);
router.get('/:batch', getStatsByBatch);

// Protected routes (Admin only)
router.post('/', protect, createOrUpdateStats);
router.put('/:batch', protect, createOrUpdateStats);
router.delete('/:batch', protect, deleteStats);

export default router;
