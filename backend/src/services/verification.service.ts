import pool from '../config/db';
import { v4 as uuidv4 } from 'uuid';
import { sendVerificationEmail } from '../utils/email.utils';

export class VerificationService {
  async createCode(email: string, type: 'register' | 'reset'): Promise<void> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const id = uuidv4();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await pool.query(
      `INSERT INTO email_verification_codes (id, email, code, type, expires_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, email, code, type, expiresAt]
    );

    await sendVerificationEmail(email, code, type);
  }

  async verifyCode(email: string, code: string, type: 'register' | 'reset'): Promise<boolean> {
  const res = await pool.query(
    `SELECT * FROM email_verification_codes
     WHERE email = $1 AND code = $2 AND type = $3 AND expires_at > NOW()`,
    [email, code, type]
  );

  if (res.rows.length === 0) return false;

  // ✅ Invalidate all codes for that email & type
  await pool.query(
    `DELETE FROM email_verification_codes WHERE email = $1 AND type = $2`,
    [email, type]
  );

  return true;
}

}

export default new VerificationService();
