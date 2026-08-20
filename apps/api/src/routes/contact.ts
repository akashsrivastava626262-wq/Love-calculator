import { Router } from 'express';
import { prisma } from '@aakshi/database';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.post('/', asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  await prisma.contactMessage.create({
    data: { name, email, phone, subject, message },
  });

  res.status(201).json({ success: true, message: 'Message sent successfully. We will respond within 24 hours.' });
}));

export default router;
