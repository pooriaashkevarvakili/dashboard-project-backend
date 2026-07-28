import {
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateCryptoDto {
  @IsString()
  name!: string;

  @IsString()
  symbol!: string;

  @IsNumber()
  price!: number;

  @IsNumber()
  changePercent!: number;

  @IsBoolean()
  alert!: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  sparklineData!: number[];
}