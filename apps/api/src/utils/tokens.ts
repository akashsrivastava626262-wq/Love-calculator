import jwt from 'jsonwebtoken';
import { UserRole } from '@aakshi/database';

interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
}

export const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET || 'aakshi-secret';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_REFRESH_SECRET || 'aakshi-refresh-secret';
  return jwt.sign(payload, secret, { expiresIn: '30d' });
};

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AAK-${timestamp}-${random}`;
};
