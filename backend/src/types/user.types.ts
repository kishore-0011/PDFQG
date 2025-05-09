export interface User{
    id : string;
    username: string;
    email: string;
    password: string;
    fullName?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserDto{
    id : string;
    username: string;
    email: string;
    password: string;
    fullName?: string;
}