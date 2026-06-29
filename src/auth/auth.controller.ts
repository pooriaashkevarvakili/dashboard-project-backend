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
  async signin(@Res({ passthrough: true }) response: Response, @Body() signinDto: SiginninDto) {
    const result = await this.authService.signin(signinDto);

    response.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax', 
     
    });


    return result;
  }
}
