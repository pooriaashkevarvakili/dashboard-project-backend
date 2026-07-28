import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateTradeDto {
  @IsNumber()
  id!: number;

  @IsString()
  pair!: string;

  @IsEnum(['خرید', 'فروش'])
  type!: string;

  @IsNumber()
  amount!: number;

  @IsNumber()
  price!: number;

  @IsNumber()
  total!: number;

  @IsString()
  time!: string;

  @IsEnum(['تکمیل‌شده', 'در انتظار', 'لغوشده'])
  status!: string;
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page = 1;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit = 10;
}