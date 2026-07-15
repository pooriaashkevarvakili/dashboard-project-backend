import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional, IsUrl, Min, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateCryptoNewsDto {
  @ApiProperty({ description: 'عنوان خبر', maxLength: 255, example: 'بیت‌کوین از مرز ۷۲,۰۰۰ دلار عبور کرد' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @ApiProperty({ description: 'خلاصه خبر', example: 'بیت‌کوین با شکستن مقاومت ۷۲,۰۰۰ دلاری...' })
  @IsString()
  @IsNotEmpty()
  summary!: string;

  @ApiProperty({ description: 'دسته‌بندی', maxLength: 50, example: 'bitcoin' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  category!: string;

  @ApiProperty({ description: 'منبع', maxLength: 100, example: 'کویندسک' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  source!: string;

  @ApiPropertyOptional({ description: 'لینک خبر', example: 'https://example.com/news/1' })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiPropertyOptional({ description: 'آیا خبر داغ است؟', example: true, default: false })
  @IsOptional()
  @IsBoolean()
  trending?: boolean;

  @ApiPropertyOptional({ description: 'زمان انتشار (تایم‌استمپ)', example: 1710532800000, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  timestamp?: number;
}