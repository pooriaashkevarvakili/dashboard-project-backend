import { AuthService } from './auth.service';
import { SiginninDto } from './dto/signin.dto';
import { SiginnupDto } from './dto/SiginnupDto';
import type { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SiginnupDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            username: string;
        };
    }>;
    signin(response: Response, signinDto: SiginninDto): Promise<{
        accessToken: string;
    }>;
}
