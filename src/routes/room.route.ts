import { Router } from "express";

import { createRoom, getRooms } from "../controllers/room.controller";
import { RoomSchema } from "../validations/room.validation";
import { validate } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { paginationMiddleware } from "../middlewares/pagination.middleware";

const router = Router();

router.post("/", authMiddleware, validate(RoomSchema), createRoom);
router.get("/", authMiddleware, paginationMiddleware, getRooms);

export default router;
