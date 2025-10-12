import authRouter from "./auth.route";
import userRouter from "./user.route";
import messageRouter from "./message.route";
import roomRouter from "./room.route";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/message", messageRouter);
router.use("/room", roomRouter);

export default router;