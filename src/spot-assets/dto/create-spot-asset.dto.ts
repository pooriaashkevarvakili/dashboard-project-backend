import { IsString, IsNumber } from "class-validator";

export class CreateSpotAssetDto {
    @IsNumber()
    id!:number
  @IsString()
  key!: string;

  @IsString()
  currency!: string;

  @IsString()
  name!: string;

  @IsString()
  icon!: string;

  @IsNumber()
  balance!: number;

  @IsNumber()
  usdValue!: number;

  @IsNumber()
  available!: number;

  @IsNumber()
  frozen!: number;

  @IsNumber()
  change24h!: number;
}