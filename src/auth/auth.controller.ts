import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SiginnupDto } from './dto/SiginnupDto';
import { SiginninDto } from './dto/signin.dto';
import { Auth } from './decorator/auth.decortor';
import { AuthType } from './enum/auth-type';
import type { Response } from 'express';
import { SkipThrottle, Throttle } from '@nestjs/throttler';


@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Throttle({
  default:{
    ttl:10000,
    limit:3
  }
})
  @Post('signup')
  async signup(@Body() signupDto: SiginnupDto) {
    return this.authService.signup(signupDto);
  }
@Throttle({
  default:{
    ttl:10000,
    limit:3
  }
})
 @Post('signin')
async signin(
  @Body() signinDto: SiginninDto,
  @Res({ passthrough: true }) response: Response,
) {
  const result = await this.authService.signin(signinDto);

  response.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000,
  });

  return {
    statusCode: 200,
    message: 'Login successful',
    accessToken: result.accessToken,
    user: result.user,
  };
}
}