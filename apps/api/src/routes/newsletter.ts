import { Router } from 'express';
import { prisma } from '@aakshi/database';
import { asyncHandler, AppError } from '../middleware/errorHandler';

const router = Router();

router.post('/subscribe', asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new AppError('Email is required', 400);

  await prisma.newsletter.upsert({
    where: { email },
    update: { isActive: true },
    create: { email },
  });

  res.json({ success: true, message: 'Successfully subscribed to AAKSHI newsletter!' });
}));

export default router;
