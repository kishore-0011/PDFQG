import { Request, Response } from 'express';
import VerificationService from '../services/verification.service';

class VerificationController {
  async sendCode(req: Request, res: Response): Promise<void> {
    try {
      const { email, type } = req.body;

      if (!email || !['register', 'reset'].includes(type)) {
        res.status(400).json({ message: 'Invalid request' });
        return;
      }

      // Only call the service, which handles code + email
      await VerificationService.createCode(email, type);

      res.status(200).json({ message: 'Verification code sent' });
    } catch (error) {
      console.error('Error sending verification code:', error);
      res.status(500).json({ message: 'Failed to send verification code' });
    }
  }

  async verifyCode(req: Request, res: Response): Promise<void> {
    try {
      const { email, code, type } = req.body;

      if (!email || !code || !type) {
        res.status(400).json({ message: 'Missing parameters' });
        return;
      }

      const isValid = await VerificationService.verifyCode(email, code, type);

      if (!isValid) {
        res.status(400).json({ message: 'Invalid or expired code' });
        return;
      }

      res.status(200).json({ message: 'Code verified' });
    } catch (error) {
      console.error('Error verifying code:', error);
      res.status(500).json({ message: 'Code verification failed' });
    }
  }
}

export default new VerificationController();
