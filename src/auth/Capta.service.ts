import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CaptchaService {
  async verify(token: string): Promise<boolean> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

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
      throw new BadRequestException(data);
    }

    return true;
  }
}