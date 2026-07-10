import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class SiginninDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'Password (exactly 10 digits)',
    example: '1234567890',
  })
  @IsNotEmpty()
  @Matches(/^\d{10}$/, {
    message: 'رمز عبور باید دقیقاً ۱۰ رقم و فقط شامل اعداد باشد.',
  })
  password!: string;

  @ApiProperty({
    description: 'Google reCAPTCHA token',
    example: '03AFcWeA7xxxxxxxxxxxxxxxxxxxxxxxx',
  })
  @IsString()
  @IsNotEmpty()
  captchaToken!: string;
}