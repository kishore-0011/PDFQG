import UserModel  from "../models/user.models";
import { AuthResponse, LoginUserDto, RegisterUserDto } from "../types/auth.types";
import { generateToken } from "../utils/jwt.utils";
import { comparePassword, hashPassword } from "../utils/password.utils";



class AuthService {
  /**
   * Register a new user
   * @param userData User registration data
   * @returns Authentication response with token and user info
   */
  async register(userData: RegisterUserDto): Promise<AuthResponse> {
    const { username, email, password, fullName } = userData;
    
    // Check if email already exists
    const existingUserByEmail = await UserModel.findByEmail(email);
    if (existingUserByEmail) {
      throw new Error('Email already in use');
    }
    
    // Check if username already exists
    const existingUserByUsername = await UserModel.findByUsername(username);
    if (existingUserByUsername) {
      throw new Error('Username already in use');
    }
    
    // Hash the password
    const hashedPassword = await hashPassword(password);
    
    // Create the user
    const user = await UserModel.create(username, email, hashedPassword, fullName);
    
    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username
    });
    
    return { token, user };
  }
  
  /**
   * Login an existing user
   * @param loginData User login data
   * @returns Authentication response with token and user info
   */
  async login(loginData: LoginUserDto): Promise<AuthResponse> {
    const { email, password } = loginData;
    
    // Find user by email
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Verify password
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }
    
    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username
    });
    
    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;
    
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
}

export default new AuthService();