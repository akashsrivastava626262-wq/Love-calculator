import { Router } from 'express';
import {
  getProducts, getProduct, getCategories, getCategory,
  addReview, smartSearch, getRecommendations,
  createProduct, updateProduct, deleteProduct, bulkImportProducts,
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', getProducts);
router.get('/search', smartSearch);
router.get('/recommendations', getRecommendations);
router.get('/categories', getCategories);
router.get('/categories/:slug', getCategory);
router.get('/:slug', getProduct);
router.post('/:id/reviews', protect, addReview);

router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.post('/bulk-import', protect, adminOnly, bulkImportProducts);

export default router;
