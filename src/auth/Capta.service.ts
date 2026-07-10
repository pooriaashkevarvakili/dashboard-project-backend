import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CaptchaService {
  async verify(token: string): Promise<boolean> {
    // Hard‑code کردن کلید تست گوگل (فقط برای توسعه)
    const secretKey = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

    // اگر خواستید هم از env و هم hard‑code استفاده کنید:
    // const secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

    console.log('======================');
    console.log('SECRET KEY:', secretKey);
    console.log('TOKEN:', token);
    console.log('======================');

    const { data } = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: secretKey,
          response: token,
        },
      },
    );

    console.log('Google Response:', data);

    if (!data.success) {
      throw new BadRequestException({
        message: 'Invalid captcha',
        googleResponse: data,
      });
    }

    return true;
  }
}