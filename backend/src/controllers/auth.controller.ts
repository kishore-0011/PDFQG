import { Request, Response } from "express";
import { LoginUserDto, RegisterUserDto } from "../types/auth.types";
import AuthService from "../services/auth.services";

class AuthController {
  // Handle user registration
  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData: RegisterUserDto = req.body;

      if (!userData.username || !userData.email || !userData.password) {
        res.status(400).json({ message: "Username, Email and Password are required" });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        res.status(400).json({ message: "Invalid email id" });
        return;
      }

      if (userData.password.length < 8) {
        res.status(400).json({ message: "Password must be at least 8 letters long" });
        return;
      }

      const { token, user } = await AuthService.register(userData);

      // Set token in HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({ user, message: "Registered successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }

  // Handle user login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData: LoginUserDto = req.body;

      if (!loginData.email || !loginData.password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      const { token, user } = await AuthService.login(loginData);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }

  // Get current user
  async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ message: "User not authenticated" });
        return;
      }

      const userId = req.user.userId;
      const user = await AuthService.getCurrentUser(userId);

      res.status(200).json({ user, message: "User retrieved successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }

  // Handle user logout
  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }
}

export default new AuthController();