
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { SIDE } from '../side.enum';

export class CreateOrderBookDto {
  
  @IsEnum(SIDE)
  side!: SIDE;
  @IsNumber()
  price!: number;

  @IsNumber()
  amount!: number;
    @IsNumber()

   total!:number
}

