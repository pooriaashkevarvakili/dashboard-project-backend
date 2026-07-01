import { Controller, Get, Post, Body, Patch, Param, Delete, Res, } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  SiginninDto } from './dto/signin.dto';
import { SiginnupDto } from './dto/SiginnupDto';
import { AuthType } from './enum/auth-type';
import { Auth } from './decorator/auth.decortor';
import type { Response } from 'express';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  
  async signup(@Body() signupDto: SiginnupDto) {
    return this.authService.signup(signupDto);
  }
@Post('signin')
async signin(
  @Res({ passthrough: true }) response: Response,
  @Body() signinDto: SiginninDto,
) {
  try {
    console.log('========== CONTROLLER ==========');
    console.log('Request Body:', signinDto);

    console.log('Step 1: Calling AuthService.signin()');

    const result = await this.authService.signin(signinDto);

    console.log('Step 2: Service Success');
    console.log(result);

    console.log('Step 3: Setting Access Token Cookie');

    response.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    console.log('Access Cookie OK');

    console.log('Step 4: Setting Refresh Token Cookie');

    response.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    console.log('Refresh Cookie OK');

    console.log('========== END ==========');

    return {
      accessToken: result.accessToken,
    };
  } catch (error) {
    console.error('========== CONTROLLER ERROR ==========');
    console.error(error);
    throw error;
  }
}
}
