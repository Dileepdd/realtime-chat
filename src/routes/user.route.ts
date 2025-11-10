import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getMe, getAllUsers } from '../controllers/user.controller.js';

const router = Router();

router.get('/me', authMiddleware, getMe);
router.get('/', authMiddleware, getAllUsers);

export default router;
