import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsNotEmpty, IsString } from 'class-validator';

export class SiginnupDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'User password (minimum 10 characters)',
    example: 'password123',
    required: true,
    minLength: 10,
  })
  @IsNotEmpty()
  @MinLength(10)
  password!: string;

  @ApiProperty({
    description: 'Username',
    example: 'pooria05',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username!: string;
}