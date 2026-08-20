import { Router } from 'express';
import { prisma } from '@aakshi/database';
import { asyncHandler, AppError } from '../middleware/errorHandler';

const router = Router();

router.post('/validate', asyncHandler(async (req, res) => {
  const { code, orderTotal } = req.body;

  const coupon = await prisma.coupon.findUnique({ where: { code, isActive: true } });
  if (!coupon) throw new AppError('Invalid coupon code', 400);

  if (coupon.startsAt && coupon.startsAt > new Date()) {
    throw new AppError('Coupon not yet active', 400);
  }
  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    throw new AppError('Coupon has expired', 400);
  }
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    throw new AppError('Coupon usage limit reached', 400);
  }
  if (coupon.minOrderAmount && orderTotal < Number(coupon.minOrderAmount)) {
    throw new AppError(`Minimum order of ₹${coupon.minOrderAmount} required`, 400);
  }

  let discount = 0;
  if (coupon.type === 'PERCENTAGE') {
    discount = orderTotal * (Number(coupon.value) / 100);
    if (coupon.maxDiscount) discount = Math.min(discount, Number(coupon.maxDiscount));
  } else {
    discount = Number(coupon.value);
  }

  res.json({
    success: true,
    data: {
      code: coupon.code,
      type: coupon.type,
      discount: Math.round(discount * 100) / 100,
    },
  });
}));

export default router;
