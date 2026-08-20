import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '@aakshi/database';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { authenticate, AuthRequest } from '../middleware/auth';
import { generateToken, generateOTP } from '../utils/tokens';

const router = Router();

router.post('/register', asyncHandler(async (req, res) => {
  const { email, password, name, phone, referralCode } = req.body;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new AppError('Email already registered', 409);

  const hashedPassword = await bcrypt.hash(password, 12);
  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  let referredById: string | undefined;
  if (referralCode) {
    const referrer = await prisma.user.findUnique({ where: { referralCode } });
    if (referrer) referredById = referrer.id;
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      phone,
      otp,
      otpExpiresAt,
      referredById,
    },
    select: { id: true, email: true, name: true, role: true },
  });

  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  res.status(201).json({
    success: true,
    message: 'Registration successful. Please verify your email with OTP.',
    data: { user, token, otp: process.env.NODE_ENV === 'development' ? otp : undefined },
  });
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw new AppError('Invalid credentials', 401);
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new AppError('Invalid credentials', 401);

  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  res.json({
    success: true,
    data: {
      user: { id: user.id, email: user.email, name: user.name, role: user.role, image: user.image },
      token,
    },
  });
}));

router.post('/verify-otp', asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError('User not found', 404);

  if (user.otp !== otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
    throw new AppError('Invalid or expired OTP', 400);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date(), otp: null, otpExpiresAt: null },
  });

  res.json({ success: true, message: 'Email verified successfully' });
}));

router.post('/forgot-password', asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const otp = generateOTP();
    await prisma.user.update({
      where: { id: user.id },
      data: { otp, otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) },
    });
  }

  res.json({ success: true, message: 'If the email exists, an OTP has been sent' });
}));

router.post('/reset-password', asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError('User not found', 404);

  if (user.otp !== otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
    throw new AppError('Invalid or expired OTP', 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword, otp: null, otpExpiresAt: null },
  });

  res.json({ success: true, message: 'Password reset successfully' });
}));

router.get('/me', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: {
      id: true, email: true, name: true, phone: true, role: true,
      image: true, rewardPoints: true, referralCode: true, emailVerified: true,
      createdAt: true,
    },
  });

  res.json({ success: true, data: user });
}));

export default router;
