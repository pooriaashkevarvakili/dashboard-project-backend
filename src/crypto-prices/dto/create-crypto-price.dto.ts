import { IsNumber, IsString } from 'class-validator';

export class CreateCryptoPriceDto {
 

  @IsString()
  name!: string;

  @IsString()
  symbol!: string;

  @IsNumber()
  price!: number;

  @IsNumber()
  change!: number;

  @IsString()
  icon!: string;

  @IsString()
  volume!: string;

  @IsString()
  marketCap!: string;
}