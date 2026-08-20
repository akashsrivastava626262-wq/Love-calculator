import { Router } from 'express';
import { prisma } from '@aakshi/database';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { authenticate, AuthRequest } from '../middleware/auth';
import { getParam } from '../utils/params';

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler(async (req: AuthRequest, res) => {
  const items = await prisma.cartItem.findMany({
    where: { userId: req.user!.id },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });

  const subtotal = items.reduce((sum, item) => {
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  res.json({ success: true, data: { items, subtotal } });
}));

router.post('/', asyncHandler(async (req: AuthRequest, res) => {
  const { productId, variantId, quantity = 1 } = req.body;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.isActive) throw new AppError('Product not found', 404);
  if (product.stock < quantity) throw new AppError('Insufficient stock', 400);

  const item = await prisma.cartItem.upsert({
    where: {
      userId_productId_variantId: {
        userId: req.user!.id,
        productId,
        variantId: variantId || null,
      },
    },
    update: { quantity: { increment: quantity } },
    create: { userId: req.user!.id, productId, variantId, quantity },
    include: { product: true },
  });

  res.status(201).json({ success: true, data: item });
}));

router.put('/:id', asyncHandler(async (req: AuthRequest, res) => {
  const { quantity } = req.body;
  const item = await prisma.cartItem.update({
    where: { id: getParam(req.params.id), userId: req.user!.id },
    data: { quantity },
    include: { product: true },
  });
  res.json({ success: true, data: item });
}));

router.delete('/:id', asyncHandler(async (req: AuthRequest, res) => {
  await prisma.cartItem.delete({
    where: { id: getParam(req.params.id), userId: req.user!.id },
  });
  res.json({ success: true, message: 'Item removed from cart' });
}));

router.post('/save-for-later/:id', asyncHandler(async (req: AuthRequest, res) => {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: getParam(req.params.id), userId: req.user!.id },
  });
  if (!cartItem) throw new AppError('Cart item not found', 404);

  await prisma.$transaction([
    prisma.savedForLaterItem.create({
      data: {
        userId: req.user!.id,
        productId: cartItem.productId,
        variantId: cartItem.variantId,
      },
    }),
    prisma.cartItem.delete({ where: { id: cartItem.id } }),
  ]);

  res.json({ success: true, message: 'Item saved for later' });
}));

export default router;
