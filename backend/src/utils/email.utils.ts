import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com', // fallback for Gmail
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER || process.env.EMAIL_USER,
    pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
  },
});

/**
 * Sends a verification or password reset email.
 * 
 * @param email - recipient email
 * @param code - 6-digit verification code
 * @param type - 'register' or 'reset'
 */
export const sendVerificationEmail = async (
  email: string,
  code: string,
  type: 'register' | 'reset'
) => {
  const subject = type === 'register' ? 'Verify your Email' : 'Reset Your Password';
  const html = `
    <div style="font-family:sans-serif">
      <p>Your ${type} verification code is:</p>
      <h2>${code}</h2>
      <p>This code will expire in 10 minutes.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"PDF Quiz Generator" <${process.env.SMTP_USER || process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html,
  });
};
