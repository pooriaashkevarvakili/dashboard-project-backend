import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsNotEmpty, IsString } from 'class-validator';

export class SiginninDto {
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
  })
  @IsString()
  @MinLength(10)
  @IsNotEmpty()
  password!: string;
}