import { IsNumber, IsString } from "class-validator";

export class CreateWalletTableDto {
  @IsString()
  name!: string;

  @IsString()
  address!: string;

  @IsNumber()
  balance!: number;

  @IsNumber()
  value!: number;

  @IsString()
  currency!: string;

  @IsString()
  type!: string;

  @IsString()
  status!: string;
}