import { Router } from 'express';
import { prisma } from '@aakshi/database';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  const collections = await prisma.collection.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { products: true } } },
  });
  res.json({ success: true, data: collections });
}));

router.get('/featured', asyncHandler(async (_req, res) => {
  const collections = await prisma.collection.findMany({
    where: { featured: true },
    include: {
      products: {
        where: { isActive: true },
        take: 4,
      },
    },
  });
  res.json({ success: true, data: collections });
}));

export default router;
