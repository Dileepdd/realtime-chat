import { Router } from 'express';

import { createRoom, getRooms } from '../controllers/room.controller.js';
import { RoomSchema } from '../validations/room.validation.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { paginationMiddleware } from '../middlewares/pagination.middleware.js';
import { createRateLimiter } from '../utils/rateLimit.helper.js';
import { DEFAULT_RATE_LIMIT } from '../config/rateLimits.js';
const router = Router();

router.post(
  '/',
  authMiddleware,
  createRateLimiter(DEFAULT_RATE_LIMIT),
  validate(RoomSchema),
  createRoom
);
router.get('/', authMiddleware, paginationMiddleware, getRooms);

export default router;
