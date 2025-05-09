import { Request, Response, NextFunction} from "express";
import { JwtPayload } from "../types/auth.types";
import { verifyToken } from "../utils/jwt.utils";


declare global{
    namespace Express{
        interface Request{
            user?: JwtPayload;
        }
    }
}

// Authenticate user req using jwt tokens

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({ message: 'Authorization header missing' });
      return;
    }
    
    // Check if the header is in the correct format
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      res.status(401).json({ message: 'Invalid authorization format. Use Bearer {token}' });
      return;
    }
    
    const token = parts[1];
    
    // Verify the token
    const payload = verifyToken(token);
    
    if (!payload) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }
    
    // Attach the user payload to the request object
    req.user = payload;
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};