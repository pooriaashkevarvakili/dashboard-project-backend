import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsPositive,
  Min,
  Max,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateExchangeDto {
  @IsString()
  name!: string;
  @IsOptional()
  @Type(() => Number)
 


  @IsString()
  pair!: string;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsNumber()
  @Min(0)
  volume!: number;

  @IsNumber()
  @Min(0)
  spread!: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  trust!: number;
}