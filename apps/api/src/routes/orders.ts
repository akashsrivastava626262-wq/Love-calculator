import { Router } from 'express';
import { prisma } from '@aakshi/database';
import { OrderStatus, PaymentMethod } from '@prisma/client';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { authenticate, AuthRequest } from '../middleware/auth';
import { getParam } from '../utils/params';
import { generateOrderNumber } from '../utils/tokens';

const router = Router();

router.use(authenticate);

router.get('/', asyncHandler(async (req: AuthRequest, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user!.id },
    include: { items: true, address: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: orders });
}));

router.get('/:id', asyncHandler(async (req: AuthRequest, res) => {
  const order = await prisma.order.findFirst({
    where: { id: getParam(req.params.id), userId: req.user!.id },
    include: { items: { include: { product: true } }, address: true },
  });
  if (!order) throw new AppError('Order not found', 404);
  res.json({ success: true, data: order });
}));

router.post('/', asyncHandler(async (req: AuthRequest, res) => {
  const { addressId, shippingMethod, paymentMethod, couponCode } = req.body;

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: req.user!.id },
    include: { product: true },
  });

  if (cartItems.length === 0) throw new AppError('Cart is empty', 400);

  let subtotal = cartItems.reduce((sum, item) => {
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  let discountAmount = 0;
  let couponId: string | undefined;

  if (couponCode) {
    const coupon = await prisma.coupon.findUnique({ where: { code: couponCode, isActive: true } });
    if (coupon) {
      if (coupon.minOrderAmount && subtotal < Number(coupon.minOrderAmount)) {
        throw new AppError(`Minimum order amount of ₹${coupon.minOrderAmount} required`, 400);
      }
      if (coupon.type === 'PERCENTAGE') {
        discountAmount = subtotal * (Number(coupon.value) / 100);
        if (coupon.maxDiscount) discountAmount = Math.min(discountAmount, Number(coupon.maxDiscount));
      } else {
        discountAmount = Number(coupon.value);
      }
      couponId = coupon.id;
    }
  }

  const shippingSetting = await prisma.siteSetting.findUnique({ where: { key: 'standard_shipping_cost' } });
  const freeShippingSetting = await prisma.siteSetting.findUnique({ where: { key: 'free_shipping_threshold' } });
  const freeThreshold = parseFloat(freeShippingSetting?.value || '999');
  const standardShipping = parseFloat(shippingSetting?.value || '99');

  let shippingCost = subtotal >= freeThreshold ? 0 : standardShipping;
  if (shippingMethod === 'express') {
    const expressSetting = await prisma.siteSetting.findUnique({ where: { key: 'express_shipping_cost' } });
    shippingCost = parseFloat(expressSetting?.value || '199');
  }

  const taxRate = await prisma.taxRate.findFirst({ where: { isActive: true } });
  const taxAmount = (subtotal - discountAmount) * (Number(taxRate?.rate || 18) / 100);
  const total = subtotal - discountAmount + shippingCost + taxAmount;

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: req.user!.id,
        addressId,
        status: OrderStatus.PENDING,
        paymentMethod: paymentMethod as PaymentMethod,
        subtotal,
        shippingCost,
        taxAmount,
        discountAmount,
        total,
        couponId,
        couponCode,
        shippingMethod,
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            name: item.product.name,
            sku: item.product.sku,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.images[0],
          })),
        },
      },
      include: { items: true },
    });

    for (const item of cartItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    await tx.cartItem.deleteMany({ where: { userId: req.user!.id } });

    if (couponId) {
      await tx.coupon.update({
        where: { id: couponId },
        data: { usedCount: { increment: 1 } },
      });
    }

    return newOrder;
  });

  res.status(201).json({ success: true, data: order });
}));

export default router;
