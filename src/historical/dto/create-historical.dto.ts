import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateHistoricalDto {
  @IsDateString()
  date!: string;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsNumber()
  @IsPositive()
  volume!: number;

  @IsNumber()
  @IsPositive()
  marketCap!: number;
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