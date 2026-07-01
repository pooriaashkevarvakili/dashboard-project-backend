import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  Matches,
} from "class-validator";

export class SiginninDto {
  @ApiProperty({
    description: "User email address",
    example: "user@example.com",
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: "Password (exactly 10 digits)",
    example: "1234567890",
    required: true,
  })
  @IsNotEmpty()
  @Matches(/^\d{10}$/, {
    message: "رمز عبور باید دقیقاً ۱۰ رقم و فقط شامل اعداد باشد.",
  })
  password!: string;
}