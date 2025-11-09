import { Router } from 'express';

import { validate } from '../middlewares/validate.middleware.js';
import { createMessage, getMessagesByRoomId } from '../controllers/message.controller.js';
import { MessageSchema } from '../validations/message.validation.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createRateLimiter } from '../utils/rateLimit.helper.js';
import { DEFAULT_RATE_LIMIT } from '../config/rateLimits.js';

const router = Router();

router.post(
  '/',
  authMiddleware,
  createRateLimiter(DEFAULT_RATE_LIMIT),
  validate(MessageSchema),
  createMessage
);

router.get('/:roomId', authMiddleware, getMessagesByRoomId);

export default router;
