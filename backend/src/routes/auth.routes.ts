import { Router } from "express";
import AuthController from '../controllers/auth.controller';

const router = Router();

// Register user
// POST /api/auth/register
router.post('/register', AuthController.register);

// Login user
// POST /api/auth/login
router.post('/login', AuthController.login);



export default router;