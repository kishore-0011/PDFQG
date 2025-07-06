export interface RegisterUserDto{
    username: string;
    email: string;
    password: string;
    fullName?: string;
}

export interface LoginUserDto{
    email: string;
    password: string;
}

export interface AuthResponse{
    token: string;
    user:{
        id: string;
        username: string;
        email: string;
        fullName?: string;
    };
}

export interface JwtPayload{
    userId: string;
    email: string;
    username: string;
    iat?: number;
    exp?: number;
}

export interface UserData{
    id: string;
    username: string;
    email: string;
    fullName?: string;
    plan: 'free' | 'pro' | 'enterprise';
    quizCount: number;
}