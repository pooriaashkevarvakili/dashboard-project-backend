import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CaptchaService {
  async verify(token: string): Promise<boolean> {
    const secretKey = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
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


    if (!data.success) {
      throw new BadRequestException({
        message: 'Invalid captcha',
        googleResponse: data,
      });
    }

    return true;
  }
}