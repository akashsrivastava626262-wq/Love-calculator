import { Router } from 'express';
import {
  getCart, addToCart, updateCartItem, removeFromCart,
  applyCoupon, removeCoupon, estimateDelivery,
} from '../controllers/cartController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

router.use(optionalAuth);
router.get('/', getCart);
router.post('/add', addToCart);
router.put('/item/:itemId', updateCartItem);
router.delete('/item/:itemId', removeFromCart);
router.post('/coupon', applyCoupon);
router.delete('/coupon', removeCoupon);
router.get('/estimate-delivery', estimateDelivery);

export default router;
