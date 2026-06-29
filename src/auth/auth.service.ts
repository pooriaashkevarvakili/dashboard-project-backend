import { BadRequestException,NotFoundException, ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SiginnupDto } from './dto/SiginnupDto';
import { ConfigType as ConfigTypeOriginal } from '@nestjs/config';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiginninDto } from './dto/signin.dto';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { Hashingservice } from './hashingService/hashingservice.service';

type ConfigType<T extends (...args: any) => any> = ConfigTypeOriginal<T>;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly userRepository: Repository<Auth>,
    private readonly hashingService: Hashingservice,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

async signup(signupDto: SiginnupDto) {
    if (!signupDto.email || !signupDto.username || !signupDto.password) {
      throw new BadRequestException(
        'ایمیل، نام کاربری و رمز عبور الزامی هستند',
      );
    }

    const existingUser = await this.userRepository.findOne({
      where: [
        { email: signupDto.email },
        { username: signupDto.username },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'کاربری با این ایمیل یا نام کاربری وجود دارد',
      );
    }

    const hashedPassword = await this.hashingService.hash(signupDto.password);

    const user = new Auth();
    user.email = signupDto.email;
    user.username = signupDto.username;
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return {
      message: 'User created successfully',
      email: user.email,
    };
  }


 



  async signin(signinDto: SiginninDto) {
    if (!signinDto.email || !signinDto.password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userRepository.findOneBy({ email: signinDto.email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isEqual = await this.hashingService.compare(
      signinDto.password,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.tokenissuser,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accesstokenttl,
      },
    );

    const { password, ...userWithoutPassword } = user;
    return { accessToken, user: userWithoutPassword };
  }
}
