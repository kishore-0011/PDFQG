import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../types/auth.types";
import { verifyToken } from "../utils/jwt.utils";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Middleware: Authenticate user using JWT from cookies
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get token from cookies
    const token = req.cookies?.token;

    if (!token) {
      res.status(401).json({ message: 'Authentication token missing in cookies' });
      return;
    }

    // Verify the token
    const payload = verifyToken(token);

    if (!payload) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    // Attach payload to request
    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
