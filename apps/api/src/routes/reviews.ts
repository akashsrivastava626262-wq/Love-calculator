import { Router } from 'express';
import { prisma } from '@aakshi/database';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { authenticate, AuthRequest } from '../middleware/auth';
import { getParam } from '../utils/params';

const router = Router();

router.get('/product/:productId', asyncHandler(async (req, res) => {
  const reviews = await prisma.review.findMany({
    where: { productId: getParam(req.params.productId), isApproved: true },
    include: { user: { select: { name: true, image: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: reviews });
}));

router.post('/', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { productId, rating, title, comment, images } = req.body;

  const review = await prisma.review.create({
    data: {
      userId: req.user!.id,
      productId,
      rating,
      title,
      comment,
      images: images || [],
    },
  });

  const stats = await prisma.review.aggregate({
    where: { productId, isApproved: true },
    _avg: { rating: true },
    _count: true,
  });

  await prisma.product.update({
    where: { id: productId },
    data: {
      averageRating: stats._avg.rating || 0,
      reviewCount: stats._count,
    },
  });

  res.status(201).json({ success: true, data: review });
}));

export default router;
