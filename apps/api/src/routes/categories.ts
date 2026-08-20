import { Router } from 'express';
import { prisma } from '@aakshi/database';
import { asyncHandler } from '../middleware/errorHandler';
import { getParam } from '../utils/params';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  });
  res.json({ success: true, data: categories });
}));

router.get('/:slug', asyncHandler(async (req, res) => {
  const category = await prisma.category.findUnique({
    where: { slug: getParam(req.params.slug) },
    include: { products: { where: { isActive: true } } },
  });
  res.json({ success: true, data: category });
}));

export default router;
