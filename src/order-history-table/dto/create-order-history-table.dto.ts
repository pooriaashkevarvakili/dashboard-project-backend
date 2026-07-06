import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateOrderHistoryDto {
  @IsString()
  type!: string;
  @IsString()
name!:string
  @IsNumber()
  price!: number;

  @IsNumber()
  amount!: number;

  @IsNumber()
  total!: number;

  @IsBoolean()
  status!: boolean;
  @IsString()
  side!: string;
  @IsOptional()
  time?: Date;
}
