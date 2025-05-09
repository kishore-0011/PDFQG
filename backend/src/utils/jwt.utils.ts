import jwt, { SignOptions } from "jsonwebtoken";
import { JwtPayload } from "../types/auth.types";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'afhahfiaf';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';


// Generate Jwt token for the user
// @param payload
// @return Jwt token

export const generateToken = (payload: JwtPayload): string => {
    // Type assertion to make TypeScript happy with the expiresIn string
    const options: SignOptions = { 
      expiresIn: JWT_EXPIRES_IN as any 
    };
    return jwt.sign(payload, JWT_SECRET_KEY, options);
  };

// Verify and decode a Jwt token
// @param Jwt token
// @return decoded payload if valid else null

export const verifyToken = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    } catch(error){
        return null;
    }
};