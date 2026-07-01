import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import { Auth } from './entities/auth.entity';
import { SiginnupDto } from './dto/SiginnupDto';
import { SiginninDto } from './dto/signin.dto';
import { Hashingservice } from './hashingService/hashingservice.service';
import jwtConfig from './config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly userRepository: Repository<Auth>,

    private readonly hashingService: Hashingservice,

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signup(signupDto: SiginnupDto) {
    try {
      const { email, username, password } = signupDto;

      if (!email || !username || !password) {
        throw new BadRequestException(
          'Email, username and password are required',
        );
      }

      const existingUser = await this.userRepository.findOne({
        where: [{ email }, { username }],
      });

      if (existingUser) {
        throw new ConflictException(
          'User with this email or username already exists',
        );
      }

      const hashedPassword = await this.hashingService.hash(password);

      const user = this.userRepository.create({
        email,
        username,
        password: hashedPassword,
      });

      await this.userRepository.save(user);

      return {
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      };
    } catch (error:any) {
      console.error('Signup Error:', error);

      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(error.message);
    }
  }
async signin(signinDto: SiginninDto) {
  try {
    console.log('========== SIGNIN START ==========');
    console.log('DTO:', signinDto);

    const { email, password } = signinDto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    console.log('Step 1: Finding user...');

    const user = await this.userRepository.findOne({
      where: { email },
    });

    console.log('User:', user);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    console.log('Step 2: Comparing password...');

    const isMatch = await this.hashingService.compare(
      password,
      user.password,
    );

    console.log('Password Match:', isMatch);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    console.log('Step 3: Payload:', payload);

    console.log('JWT Config:', this.jwtConfiguration);
    console.log(
      'JWT_REFRESH_SECRET:',
      process.env.JWT_REFRESH_SECRET,
    );

    console.log('Step 4: Creating Access Token...');

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfiguration.secret,
      issuer: this.jwtConfiguration.issuer,
      audience: this.jwtConfiguration.audience,
      expiresIn: '15m',
    });

    console.log('Access Token Created');

    console.log('Step 5: Creating Refresh Token...');

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      issuer: this.jwtConfiguration.issuer,
      audience: this.jwtConfiguration.audience,
      expiresIn: '3d',
    });

    console.log('Refresh Token Created');

    console.log('========== SIGNIN SUCCESS ==========');

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  } catch (error) {
    console.error('========== SIGNIN ERROR ==========');
    console.error(error);
    throw error;
  }
}
}