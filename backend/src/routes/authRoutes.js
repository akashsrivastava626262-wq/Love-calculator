import { Router } from 'express';
import {
  register, login, sendOTP, verifyOTP, forgotPassword, resetPassword,
  getProfile, updateProfile, changePassword, socialLogin,
  addAddress, deleteAddress, toggleWishlist, getWishlist, trackRecentlyViewed,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { authLimiter, otpLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/otp/send', otpLimiter, sendOTP);
router.post('/otp/verify', authLimiter, verifyOTP);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, resetPassword);
router.post('/social', socialLogin);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.post('/addresses', protect, addAddress);
router.delete('/addresses/:id', protect, deleteAddress);
router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:productId', protect, toggleWishlist);
router.post('/recently-viewed/:productId', protect, trackRecentlyViewed);

export default router;
