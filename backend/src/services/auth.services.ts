import UserModel  from "../models/user.models";
import { AuthResponse, LoginUserDto, RegisterUserDto, UserData } from "../types/auth.types";
import { generateToken } from "../utils/jwt.utils";
import { comparePassword, hashPassword } from "../utils/password.utils";



class AuthService {
  // 
  //  User registeration
  //  @param User registration data
  //  @returns Authentication response with token and user info
  // 
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
    
    
    const hashedPassword = await hashPassword(password);
    
    
    const user = await UserModel.create(username, email, hashedPassword, fullName);
    
    
    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username
    });
    
    return { token, user };
  }
  
  
    //  User login
    //  @param User login data
    //  @returns Authentication response with token and user info
   
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
    
    
    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username
    });
    
    
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

  // Get current user information by user id
  // @params userId of the user to retrieve
  // @returns userdata without password
    
  async getCurrentUser(userId: string): Promise<UserData>{

    const user = await UserModel.findById(userId)
    if (!user){
      throw new Error('User not Found');
    }
    return{
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName
    };
  }

  // user logout

  async logout(): Promise<{message: string}> {
  
    return {message: 'Logged out successfully'}
  }

}

export default new AuthService();