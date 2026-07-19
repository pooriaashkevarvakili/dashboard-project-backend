import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Auth } from './entities/auth.entity';
import { SiginnupDto } from './dto/SiginnupDto';
import { SiginninDto } from './dto/signin.dto';
import { Hashingservice } from './hashingService/hashingservice.service';
import { CaptchaService } from './Capta.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly userRepository: Repository<Auth>,
  private readonly captchaService: CaptchaService,

    private readonly hashingService: Hashingservice,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SiginnupDto) {
    const { email, username, password } = signupDto;

    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
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
    };
  }

  async signin(signinDto: SiginninDto) {
  const { email, password, captchaToken } = signinDto;

  await this.captchaService.verify(captchaToken);

  const user = await this.userRepository.findOne({
    where: { email },
  });

  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const isMatch = await this.hashingService.compare(
    password,
    user.password,
  );

  if (!isMatch) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const accessToken = await this.jwtService.signAsync({
    sub: user.id,
    email: user.email,
  });

  return {
  message: 'Login successful',
  accessToken,
  user: {
    id: user.id,
    email: user.email,
    username: user.username,
  },
  };
}
}