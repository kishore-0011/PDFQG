import { Router } from "express";
import AuthController from '../controllers/auth.controller';
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Register user
// POST /api/auth/register
router.post('/register', AuthController.register);

// Login user
// POST /api/auth/login
router.post('/login', AuthController.login);

// Get current user
// POST /api/auth/me
router.get('/me', authenticate, AuthController.getCurrentUser);

// User logout
// POST /api/auth/logout
router.post('/logout', AuthController.logout)


export default router;