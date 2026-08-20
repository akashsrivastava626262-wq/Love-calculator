import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma, UserRole } from '@aakshi/database';
import { AppError } from './errorHandler';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export const authenticate = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.token;

    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'aakshi-secret') as {
      id: string;
      email: string;
      role: UserRole;
    };

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) throw new AppError('User not found', 401);

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
};

export const optionalAuth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'aakshi-secret') as {
        id: string;
        email: string;
        role: UserRole;
      };
      req.user = decoded;
    }
  } catch {
    // Optional auth - continue without user
  }
  next();
};

export const requireRole = (...roles: UserRole[]) =>
  (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }
    next();
  };

export const requireAdmin = requireRole(UserRole.ADMIN, UserRole.MANAGER);
