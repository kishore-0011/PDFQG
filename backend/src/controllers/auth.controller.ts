import { Request,Response} from "express";
import { LoginUserDto, RegisterUserDto } from "../types/auth.types";
import AuthService from "../services/auth.services";


class AuthController{

    // Handle user registeration
    async register(req: Request, res: Response): Promise<void>{
        try{
            const userData: RegisterUserDto = req.body;

            // validate user entries
            if (!userData.username || !userData.email || !userData.password){
                res.status(400).json({message:'Username, Email and Password are required'});
                return
            }
            
            // validate email id
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)){
            res.status(400).json({message:'Invalid email id'});
            return;
        }

            // validate password length
        if (userData.password.length < 8){
            res.status(400).json({message:'Password must be atleast 8 letters long'})
            return;
        }
        const result = await AuthService.register(userData);
        res.status(200).json(result)
        }catch(error){
            if (error instanceof Error){
                res.status(400).json({message: error.message})
            }else{
                res.status(500).json({message: 'An unexpecter error occured'})
            }
        }

    }

    // Handle user login
    async login(req: Request, res: Response): Promise<void>{
        try{
            const loginData: LoginUserDto = req.body;

            // validate req fields
            if(!loginData.email || !loginData.password){
                res.status(400).json({message:'Username and password are required'})
                return;
            }
            
            const result = await AuthService.login(loginData);
            res.status(200).json(result)        
        }catch(error){
           if (error instanceof Error){
                res.status(400).json({message: error.message})
            }else{
                res.status(500).json({message: 'An unexpecter error occured'})
            } 
    }

    }

    async getCurrentUser(req: Request, res: Response): Promise<void>{
        try{
            if (!req.user || !req.user.userId){
                res.status(401).json({message:'User not authenticated'})
                return; 
            }
            const userId = req.user.userId;
            const user = await AuthService.getCurrentUser(userId);

            res.status(200).json({
                user,
                message: 'User retrieved successfully'
            });
        }catch(error){
            if (error instanceof Error){
                res.status(400).json({message: error.message})
            }else{
                res.status(500).json({message: 'An unexpected error occured'})
            }
        }
    }

    // user logout
    async logout(req: Request, res: Response): Promise<void> {
        try {
            const result = await AuthService.logout();
            res.status(200).json(result);
        }catch(error){
            if(error instanceof Error){
                res.status(400).json({message: error.message})
            }else{
                res.status(500).json({message: 'An error occured'})
            }
        }
    }
}

export default new AuthController();
