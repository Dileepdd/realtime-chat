import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import messageRouter from './message.route.js';
import roomRouter from './room.route.js';
import { Router } from 'express';
const router = Router();
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/message', messageRouter);
router.use('/room', roomRouter);
export default router;
//# sourceMappingURL=index.route.js.map