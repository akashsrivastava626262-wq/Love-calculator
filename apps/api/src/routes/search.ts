import { Router } from 'express';
import { prisma } from '@aakshi/database';
import { Prisma } from '@prisma/client';
import { asyncHandler } from '../middleware/errorHandler';
import { getParam } from '../utils/params';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const { q, limit = '10' } = req.query;

  if (!q) {
    res.json({ success: true, data: [] });
    return;
  }

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: q as string, mode: 'insensitive' } },
        { description: { contains: q as string, mode: 'insensitive' } },
        { sku: { contains: q as string, mode: 'insensitive' } },
      ],
    },
    take: parseInt(limit as string),
    select: {
      id: true, name: true, slug: true, price: true, images: true,
      averageRating: true, compareAtPrice: true,
    },
  });

  res.json({ success: true, data: products });
}));

router.get('/recommendations/:productId', asyncHandler(async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: getParam(req.params.productId) },
  });

  if (!product) {
    res.json({ success: true, data: [] });
    return;
  }

  const recommendations = await prisma.product.findMany({
    where: {
      isActive: true,
      id: { not: product.id },
      OR: [
        { categoryId: product.categoryId },
        { collectionId: product.collectionId },
        { isBestSeller: true },
      ],
    },
    take: 6,
    orderBy: { averageRating: 'desc' },
  });

  res.json({ success: true, data: recommendations });
}));

router.get('/trending', asyncHandler(async (_req, res) => {
  const products = await prisma.product.findMany({
    where: { isActive: true, isTrending: true },
    take: 8,
    orderBy: { reviewCount: 'desc' },
  });
  res.json({ success: true, data: products });
}));

export default router;
