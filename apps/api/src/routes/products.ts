import { Router } from 'express';
import { prisma } from '@aakshi/database';
import { Prisma } from '@prisma/client';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { optionalAuth, AuthRequest } from '../middleware/auth';
import { getParam } from '../utils/params';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
  const {
    page = '1',
    limit = '12',
    category,
    collection,
    minPrice,
    maxPrice,
    sort = 'newest',
    search,
    bestSeller,
    trending,
    newArrival,
    rating,
  } = req.query;

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  const where: Prisma.ProductWhereInput = { isActive: true };

  if (category) where.category = { slug: category as string };
  if (collection) where.collection = { slug: collection as string };
  if (bestSeller === 'true') where.isBestSeller = true;
  if (trending === 'true') where.isTrending = true;
  if (newArrival === 'true') where.isNewArrival = true;
  if (rating) where.averageRating = { gte: parseFloat(rating as string) };

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice as string);
    if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
  }

  if (search) {
    where.OR = [
      { name: { contains: search as string, mode: 'insensitive' } },
      { description: { contains: search as string, mode: 'insensitive' } },
      { tags: { some: { tag: { contains: search as string, mode: 'insensitive' } } } },
    ];
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
  switch (sort) {
    case 'price-asc': orderBy = { price: 'asc' }; break;
    case 'price-desc': orderBy = { price: 'desc' }; break;
    case 'best-selling': orderBy = { reviewCount: 'desc' }; break;
    case 'popular': orderBy = { averageRating: 'desc' }; break;
    case 'newest': default: orderBy = { createdAt: 'desc' }; break;
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limitNum,
      include: {
        category: { select: { name: true, slug: true } },
        collection: { select: { name: true, slug: true } },
      },
    }),
    prisma.product.count({ where }),
  ]);

  res.json({
    success: true,
    data: products,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
}));

router.get('/featured', asyncHandler(async (_req, res) => {
  const products = await prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    take: 8,
    include: {
      category: { select: { name: true, slug: true } },
    },
  });
  res.json({ success: true, data: products });
}));

router.get('/best-sellers', asyncHandler(async (_req, res) => {
  const products = await prisma.product.findMany({
    where: { isActive: true, isBestSeller: true },
    take: 12,
    orderBy: { reviewCount: 'desc' },
  });
  res.json({ success: true, data: products });
}));

router.get('/:slug', optionalAuth, asyncHandler(async (req: AuthRequest, res) => {
  const product = await prisma.product.findUnique({
    where: { slug: getParam(req.params.slug) },
    include: {
      category: true,
      collection: true,
      variants: true,
      reviews: {
        where: { isApproved: true },
        include: { user: { select: { name: true, image: true } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  });

  if (!product || !product.isActive) throw new AppError('Product not found', 404);

  const similar = await prisma.product.findMany({
    where: {
      isActive: true,
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
  });

  res.json({ success: true, data: { product, similar } });
}));

export default router;
