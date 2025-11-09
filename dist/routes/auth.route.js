import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { signupSchema } from '../validations/auth.validation.js';
import { loginSchema } from '../validations/auth.validation.js';
import { validate } from '../middlewares/validate.middleware.js';
const router = Router();
router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
export default router;
//# sourceMappingURL=auth.route.js.map