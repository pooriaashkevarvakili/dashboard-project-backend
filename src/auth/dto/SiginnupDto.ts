// src/iam/authcation/dto/signup.dto/signup.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class SiginnupDto {  
  @ApiProperty({ 
    description: 'User email address', 
    example: 'user@example.com',
    required: true 
  })

  @IsEmail()
  @IsNotEmpty()
  email!: string;
  
  @ApiProperty({ 
    description: 'User password (minimum 10 characters)', 
    example: 'password123',
    required: true,
    minLength: 10
  })
  @MinLength(10)
  @IsNotEmpty()
  password!: string;
  @ApiProperty({ 
    description: 'User email address', 
    example: 'pooria05',
    required: true 
  })
  username!:string
}