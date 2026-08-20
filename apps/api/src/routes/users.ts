import { Router } from 'express';
import { prisma } from '@aakshi/database';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { authenticate, AuthRequest } from '../middleware/auth';
import { getParam } from '../utils/params';

const router = Router();

router.use(authenticate);

router.get('/profile', asyncHandler(async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: {
      id: true, email: true, name: true, phone: true, image: true,
      rewardPoints: true, referralCode: true, emailVerified: true,
    },
  });
  res.json({ success: true, data: user });
}));

router.put('/profile', asyncHandler(async (req: AuthRequest, res) => {
  const { name, phone, image } = req.body;
  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data: { name, phone, image },
  });
  res.json({ success: true, data: user });
}));

router.get('/addresses', asyncHandler(async (req: AuthRequest, res) => {
  const addresses = await prisma.address.findMany({
    where: { userId: req.user!.id },
    orderBy: { isDefault: 'desc' },
  });
  res.json({ success: true, data: addresses });
}));

router.post('/addresses', asyncHandler(async (req: AuthRequest, res) => {
  const { fullName, phone, addressLine1, addressLine2, city, state, postalCode, country, isDefault } = req.body;

  if (isDefault) {
    await prisma.address.updateMany({
      where: { userId: req.user!.id },
      data: { isDefault: false },
    });
  }

  const address = await prisma.address.create({
    data: {
      userId: req.user!.id,
      fullName, phone, addressLine1, addressLine2, city, state, postalCode,
      country: country || 'India',
      isDefault: isDefault || false,
    },
  });
  res.status(201).json({ success: true, data: address });
}));

router.get('/wishlist', asyncHandler(async (req: AuthRequest, res) => {
  const wishlist = await prisma.wishlistItem.findMany({
    where: { userId: req.user!.id },
    include: { product: true },
  });
  res.json({ success: true, data: wishlist });
}));

router.post('/wishlist', asyncHandler(async (req: AuthRequest, res) => {
  const { productId } = req.body;
  const item = await prisma.wishlistItem.upsert({
    where: { userId_productId: { userId: req.user!.id, productId } },
    update: {},
    create: { userId: req.user!.id, productId },
    include: { product: true },
  });
  res.status(201).json({ success: true, data: item });
}));

router.delete('/wishlist/:productId', asyncHandler(async (req: AuthRequest, res) => {
  await prisma.wishlistItem.delete({
    where: { userId_productId: { userId: req.user!.id, productId: getParam(req.params.productId) } },
  });
  res.json({ success: true, message: 'Removed from wishlist' });
}));

router.post('/returns', asyncHandler(async (req: AuthRequest, res) => {
  const { orderId, reason, description } = req.body;
  const returnRequest = await prisma.returnRequest.create({
    data: { orderId, userId: req.user!.id, reason, description },
  });
  res.status(201).json({ success: true, data: returnRequest });
}));

export default router;
