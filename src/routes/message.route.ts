import { Router } from "express";

import { validate } from "../middlewares/validate.middleware";
import { createMessage } from "../controllers/message.controller";
import { MessageSchema } from "../validations/message.validation";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, validate(MessageSchema), createMessage);

export default router;