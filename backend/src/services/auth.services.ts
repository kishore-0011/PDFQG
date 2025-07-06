// auth.services.ts
import QuizModel from "../models/quiz.model";
import UserModel from "../models/user.models";
import { AuthResponse, LoginUserDto, RegisterUserDto, UserData } from "../types/auth.types";
import { generateToken } from "../utils/jwt.utils";
import { comparePassword, hashPassword } from "../utils/password.utils";

class AuthService {
  async register(userData: RegisterUserDto): Promise<AuthResponse> {
    const { username, email, password, fullName } = userData;

    const existingUserByEmail = await UserModel.findByEmail(email);
    if (existingUserByEmail) throw new Error('Email already in use');

    const existingUserByUsername = await UserModel.findByUsername(username);
    if (existingUserByUsername) throw new Error('Username already in use');

    const hashedPassword = await hashPassword(password);
    const user = await UserModel.create(username, email, hashedPassword, fullName);

    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username
    });

    return { token, user };
  }

  async login(loginData: LoginUserDto): Promise<AuthResponse> {
    const { email, password } = loginData;
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) throw new Error('Invalid email or password');

    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName
      }
    };
  }

  async getCurrentUser(userId: string): Promise<UserData> {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error('User not found');

  const quizzes = await QuizModel.findByUser(userId);
  const quizCount = quizzes.length;

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    fullName: user.fullName,
    plan: user.plan,
    quizCount,
  };
}

  async logout(): Promise<{ message: string }> {
    return { message: 'Logged out successfully' };
  }
}

export default new AuthService();
