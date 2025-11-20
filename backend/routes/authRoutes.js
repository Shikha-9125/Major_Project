import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../utils/multerConfig.js';

const router = express.Router();

// Public routes
router.post('/register', (req, res, next) => {
  console.log('🔥 Auth route hit - /register');
  console.log('Content-Type:', req.headers['content-type']);
  next();
}, registerUser);

router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, upload.single('profileImage'), updateUserProfile);

export default router;