import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { registerValidation, loginValidation, validate } from '../middlewares/validationMiddleware';

const router = Router();

// Route for user registration
router.post('/register', registerValidation, validate, registerUser);

// Route for user login
router.post('/login', loginValidation, validate, loginUser);

export default router;
