import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class SiginnupDto {
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
    message: 'Password must contain exactly 10 digits.',
  })
  password!: string;

  @ApiProperty({
    description: 'Username',
    example: 'pooria05',
  })
  @IsString()
  @IsNotEmpty()
  username!: string;
}