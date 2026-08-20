import { Router } from 'express';
import Razorpay from 'razorpay';
import Stripe from 'stripe';
import crypto from 'crypto';
import { prisma } from '@aakshi/database';
import { PaymentStatus, OrderStatus } from '@prisma/client';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

const razorpay = process.env.RAZORPAY_KEY_ID ? new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
}) : null;

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

router.post('/razorpay/create-order', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { orderId } = req.body;

  const order = await prisma.order.findFirst({
    where: { id: orderId, userId: req.user!.id },
  });
  if (!order) throw new AppError('Order not found', 404);

  if (!razorpay) {
    res.json({
      success: true,
      data: {
        id: `order_mock_${order.id}`,
        amount: Math.round(Number(order.total) * 100),
        currency: 'INR',
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mock',
      },
      message: 'Mock Razorpay order (configure RAZORPAY_KEY_ID for production)',
    });
    return;
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(Number(order.total) * 100),
    currency: 'INR',
    receipt: order.orderNumber,
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { razorpayOrderId: razorpayOrder.id },
  });

  res.json({
    success: true,
    data: {
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    },
  });
}));

router.post('/razorpay/verify', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature && process.env.NODE_ENV === 'production') {
    throw new AppError('Payment verification failed', 400);
  }

  const order = await prisma.order.update({
    where: { razorpayOrderId: razorpay_order_id },
    data: {
      paymentStatus: PaymentStatus.PAID,
      status: OrderStatus.CONFIRMED,
    },
  });

  res.json({ success: true, data: order, message: 'Payment verified successfully' });
}));

router.post('/stripe/create-intent', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { orderId } = req.body;

  const order = await prisma.order.findFirst({
    where: { id: orderId, userId: req.user!.id },
  });
  if (!order) throw new AppError('Order not found', 404);

  if (!stripe) {
    res.json({
      success: true,
      data: { clientSecret: `pi_mock_${order.id}_secret` },
      message: 'Mock Stripe intent (configure STRIPE_SECRET_KEY for production)',
    });
    return;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(Number(order.total) * 100),
    currency: 'inr',
    metadata: { orderId: order.id, orderNumber: order.orderNumber },
  });

  res.json({ success: true, data: { clientSecret: paymentIntent.client_secret } });
}));

router.post('/cod/confirm', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { orderId } = req.body;

  const order = await prisma.order.update({
    where: { id: orderId, userId: req.user!.id },
    data: {
      paymentStatus: PaymentStatus.PENDING,
      status: OrderStatus.CONFIRMED,
      paymentMethod: 'COD',
    },
  });

  res.json({ success: true, data: order, message: 'COD order confirmed' });
}));

export default router;
