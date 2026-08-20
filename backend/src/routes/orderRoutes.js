import { Router } from 'express';
import {
  createOrder, verifyPayment, getOrders, getOrder, trackOrder,
  requestReturn, updateOrderStatus, getAllOrders,
} from '../controllers/orderController.js';
import { protect, adminOnly, optionalAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', optionalAuth, createOrder);
router.post('/verify-payment', protect, verifyPayment);
router.get('/track', optionalAuth, trackOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.post('/:id/return', protect, requestReturn);

router.get('/admin/all', protect, adminOnly, getAllOrders);
router.put('/admin/:id', protect, adminOnly, updateOrderStatus);

export default router;
