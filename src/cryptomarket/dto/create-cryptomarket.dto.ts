import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
class CoinDto {
  @IsString()
  name!: string;

  @IsString()
  symbol!: string;
}

export class CreateCryptomarketDto {
      @IsNumber()
  @Type(() => Number)
  price!: number;

  @ValidateNested()
  @Type(() => CoinDto)
  coin!: CoinDto;

  @IsNumber()
  @Type(() => Number)
  marketCap!: number;

  @IsNumber()
  @Type(() => Number)
  volume!: number;

  @IsNumber()
  @Type(() => Number)
  circulatingSupply!: number;

  @IsNumber()
  @Type(() => Number)
  ath!: number;

  @IsNumber()
  @Type(() => Number)
  alt!: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  change?: number[];
}
