import { SiginnupDto } from './dto/SiginnupDto';
import { ConfigType as ConfigTypeOriginal } from '@nestjs/config';
import { Repository } from 'typeorm';
import { SiginninDto } from './dto/signin.dto';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { Hashingservice } from './hashingService/hashingservice.service';
type ConfigType<T extends (...args: any) => any> = ConfigTypeOriginal<T>;
export declare class AuthService {
    private readonly userRepository;
    private readonly hashingService;
    private readonly jwtService;
    private readonly jwtConfiguration;
    constructor(userRepository: Repository<Auth>, hashingService: Hashingservice, jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>);
    signup(signupDto: SiginnupDto): Promise<{
        message: string;
        email: string;
    }>;
    signin(signinDto: SiginninDto): Promise<{
        accessToken: string;
        user: {
            id: number;
            email: string;
            username: string;
        };
    }>;
}
export {};
