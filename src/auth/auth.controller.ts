import {
  Controller,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import { AuthService } from './auth.service';
import { SiginninDto } from './dto/signin.dto';
import { SiginnupDto } from './dto/SiginnupDto';
import { AuthType } from './enum/auth-type';
import { Auth } from './decorator/auth.decortor';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ================= SIGNUP =================
  @Post('signup')
  async signup(@Body() signupDto: SiginnupDto) {
    return this.authService.signup(signupDto);
  }

  // ================= SIGNIN =================
  @Post('signin')
  async signin(
    @Res({ passthrough: true }) response: Response,
    @Body() signinDto: SiginninDto,
  ) {
    try {
      console.log('========== CONTROLLER ==========');
      console.log('Request Body:', signinDto);

      const result = await this.authService.signin(signinDto);

      // 🔥 Access Token Cookie
      response.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      });

      // 🔥 Refresh Token Cookie
      response.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      console.log('========== END ==========');

      return {
        accessToken: result.accessToken,
        user: result.user, // 👈 بهتره برگردونی
      };
    } catch (error) {
      console.error('========== CONTROLLER ERROR ==========');
      console.error(error);
      throw error;
    }
  }
}