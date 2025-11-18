import express from 'express';
import {
  createExperience,
  getAllExperiences,
  getMyExperiences,
  deleteExperience
} from '../controllers/experienceController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllExperiences);

// Protected routes
router.post('/', protect, createExperience);
router.get('/my', protect, getMyExperiences);
router.delete('/:id', protect, deleteExperience);

export default router;
