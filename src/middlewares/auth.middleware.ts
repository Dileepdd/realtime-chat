import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Extend Request to include userId as ObjectId
interface AuthRequest extends Request {
  userId?: Types.ObjectId;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Decode JWT — assume payload has { id: string }
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    // Convert user id string to ObjectId
    req.userId = new Types.ObjectId(decoded.id);

    next();
  } catch (err: unknown) {
    console.error('JWT verification error:', err);
    return res.status(401).json({
      message: 'Token is not valid',
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
