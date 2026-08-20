import { Router } from 'express';
import {
  getDashboardStats, getCustomers, createCategory, updateCategory, deleteCategory,
  createCoupon, getCoupons, updateCoupon, createBanner, getBanners, updateBanner,
  deleteBanner, moderateReview, processRefund, getInventory, createBlog, getBlogs,
  getBlog, subscribeNewsletter, aiChat,
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

router.post('/newsletter', subscribeNewsletter);
router.post('/ai-chat', aiChat);
router.get('/banners', getBanners);
router.get('/blogs', getBlogs);
router.get('/blogs/:slug', getBlog);

router.use(protect, adminOnly);
router.get('/dashboard', getDashboardStats);
router.get('/customers', getCustomers);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);
router.post('/coupons', createCoupon);
router.get('/coupons', getCoupons);
router.put('/coupons/:id', updateCoupon);
router.post('/banners', createBanner);
router.put('/banners/:id', updateBanner);
router.delete('/banners/:id', deleteBanner);
router.put('/reviews/:productId/:reviewId', moderateReview);
router.post('/refunds/:id', processRefund);
router.get('/inventory', getInventory);
router.post('/blogs', createBlog);

export default router;
