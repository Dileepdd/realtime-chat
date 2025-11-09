import rateLimit, { RateLimitRequestHandler, ipKeyGenerator } from 'express-rate-limit';
import { Request } from 'express';

interface RateLimitOptions {
  max: number;
  windowMs?: number;
  message?: string;
}

export const createRateLimiter = (options: RateLimitOptions): RateLimitRequestHandler => {
  const {
    max,
    windowMs = 24 * 60 * 60 * 1000, // default 24h
    message = 'Too many requests, please try again later.',
  } = options;

  return rateLimit({
    windowMs,
    max,
    message,
    keyGenerator: (req: Request): string => {
      // If the request has an authenticated user ID, use that
      const userId = (req as any).userId;
      if (userId) return userId.toString();

      // ✅ Fix typing issue: explicitly cast req to expected type
      return ipKeyGenerator(req as unknown as Parameters<typeof ipKeyGenerator>[0]);
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};
