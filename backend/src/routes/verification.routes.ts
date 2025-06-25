import express from 'express';
import VerificationController from '../controllers/verification.controller';
import { verificationRateLimiter } from '../middlewares/rateLimiter.middleware';

const router = express.Router();

router.post('/send-code', verificationRateLimiter, VerificationController.sendCode);
router.post('/verify-code', VerificationController.verifyCode);

export default router;
