import { Router } from 'express';
import { prisma } from '@aakshi/database';
import { OrderStatus, ReturnStatus } from '@prisma/client';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticate, requireAdmin } from '../middleware/auth';
import { getParam, getQueryInt } from '../utils/params';

const router = Router();

router.use(authenticate, requireAdmin);

router.get('/dashboard', asyncHandler(async (_req, res) => {
  const [
    totalOrders,
    totalRevenue,
    totalCustomers,
    totalProducts,
    recentOrders,
    lowStockProducts,
    pendingReturns,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: 'PAID' } }),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.product.findMany({
      where: { stock: { lte: 5 }, isActive: true },
      take: 10,
    }),
    prisma.returnRequest.count({ where: { status: 'REQUESTED' } }),
  ]);

  const monthlyRevenue = await prisma.order.groupBy({
    by: ['createdAt'],
    _sum: { total: true },
    where: {
      paymentStatus: 'PAID',
      createdAt: { gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) },
    },
  });

  res.json({
    success: true,
    data: {
      stats: {
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        totalCustomers,
        totalProducts,
        pendingReturns,
      },
      recentOrders,
      lowStockProducts,
      monthlyRevenue,
    },
  });
}));

router.get('/orders', asyncHandler(async (req, res) => {
  const { status, page = '1', limit = '20' } = req.query;
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);

  const where = status ? { status: status as OrderStatus } : {};

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      include: {
        user: { select: { name: true, email: true } },
        items: true,
        address: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.count({ where }),
  ]);

  res.json({ success: true, data: orders, pagination: { page: pageNum, total, totalPages: Math.ceil(total / limitNum) } });
}));

router.put('/orders/:id/status', asyncHandler(async (req, res) => {
  const { status, trackingNumber } = req.body;
  const order = await prisma.order.update({
    where: { id: getParam(req.params.id) },
    data: { status, trackingNumber },
  });
  res.json({ success: true, data: order });
}));

router.get('/products', asyncHandler(async (req, res) => {
  const { page = '1', limit = '20', search } = req.query;
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);

  const where = search ? {
    OR: [
      { name: { contains: search as string, mode: 'insensitive' as const } },
      { sku: { contains: search as string, mode: 'insensitive' as const } },
    ],
  } : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      include: { category: true, collection: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ]);

  res.json({ success: true, data: products, pagination: { page: pageNum, total } });
}));

router.post('/products', asyncHandler(async (req, res) => {
  const product = await prisma.product.create({ data: req.body });
  res.status(201).json({ success: true, data: product });
}));

router.put('/products/:id', asyncHandler(async (req, res) => {
  const product = await prisma.product.update({
    where: { id: getParam(req.params.id) },
    data: req.body,
  });
  res.json({ success: true, data: product });
}));

router.delete('/products/:id', asyncHandler(async (req, res) => {
  await prisma.product.update({
    where: { id: getParam(req.params.id) },
    data: { isActive: false },
  });
  res.json({ success: true, message: 'Product deactivated' });
}));

router.get('/customers', asyncHandler(async (req, res) => {
  const { page = '1', limit = '20' } = req.query;
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);

  const [customers, total] = await Promise.all([
    prisma.user.findMany({
      where: { role: 'CUSTOMER' },
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
      select: {
        id: true, name: true, email: true, phone: true,
        rewardPoints: true, createdAt: true,
        _count: { select: { orders: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
  ]);

  res.json({ success: true, data: customers, pagination: { page: pageNum, total } });
}));

router.get('/reviews', asyncHandler(async (_req, res) => {
  const reviews = await prisma.review.findMany({
    include: {
      user: { select: { name: true } },
      product: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: reviews });
}));

router.put('/reviews/:id/approve', asyncHandler(async (req, res) => {
  const review = await prisma.review.update({
    where: { id: getParam(req.params.id) },
    data: { isApproved: true },
  });
  res.json({ success: true, data: review });
}));

router.get('/coupons', asyncHandler(async (_req, res) => {
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
  res.json({ success: true, data: coupons });
}));

router.post('/coupons', asyncHandler(async (req, res) => {
  const coupon = await prisma.coupon.create({ data: req.body });
  res.status(201).json({ success: true, data: coupon });
}));

router.get('/returns', asyncHandler(async (_req, res) => {
  const returns = await prisma.returnRequest.findMany({
    include: {
      order: true,
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: returns });
}));

router.put('/returns/:id', asyncHandler(async (req, res) => {
  const { status, refundAmount } = req.body;
  const returnRequest = await prisma.returnRequest.update({
    where: { id: getParam(req.params.id) },
    data: { status: status as ReturnStatus, refundAmount },
  });
  res.json({ success: true, data: returnRequest });
}));

export default router;
