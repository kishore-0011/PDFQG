import rateLimit from 'express-rate-limit';

export const verificationRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    message: 'Too many verification requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
