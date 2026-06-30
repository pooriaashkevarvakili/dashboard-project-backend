import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import { Auth } from './entities/auth.entity';
import { SiginnupDto } from './dto/SiginnupDto';
import { SiginninDto } from './dto/signin.dto';
import { Hashingservice } from './hashingService/hashingservice.service';
import jwtConfig from './config/jwt.config';
export declare class AuthService {
    private readonly userRepository;
    private readonly hashingService;
    private readonly jwtService;
    private readonly jwtConfiguration;
    constructor(userRepository: Repository<Auth>, hashingService: Hashingservice, jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>);
    signup(signupDto: SiginnupDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            username: string;
        };
    }>;
    signin(signinDto: SiginninDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            username: string;
        };
    }>;
}
