import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";
import { signupSchema } from "../validations/auth.validation";
import { loginSchema } from "../validations/auth.validation";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;