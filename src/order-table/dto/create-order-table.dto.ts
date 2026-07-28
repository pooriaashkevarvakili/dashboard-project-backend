import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatus } from '../OrderStatusEnum';

export class CreateOrderTableDto {
  @IsString()
  type!: string;

  @IsString()
  name!: string;

  @IsNumber()
  price!: number;

  @IsNumber()
  amount!: number;

  @IsNumber()
  total!: number;

  @IsEnum(OrderStatus)
  status!: OrderStatus;

  @IsOptional()
  @IsDateString()
  time?: Date;
}