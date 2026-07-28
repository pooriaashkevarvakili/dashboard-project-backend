
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Isbuyer } from '../isBuyer.enum';

export class CreateMarketTradesTableDto {
  
  @IsEnum(Isbuyer)
  isBayer!: Isbuyer;
  @IsNumber()
  price!: number;

  @IsNumber()
  amount!: number;
@IsString()
  time!: string;
}

