import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Indicator } from '../Indiactor';
import { Condition } from '../Condition';

export class CreateAlertDto {
  @ApiProperty({
    example: 'BTC',
    description: 'نماد معاملاتی',
  })
  @IsString()
  @IsNotEmpty()
  symbol!: string;

  @ApiProperty({
    enum: Indicator,
    example: Indicator.Price,
    description: 'اندیکاتور هشدار',
  })
  @IsEnum(Indicator)
  indicator!: Indicator;

  @ApiProperty({
    enum: Condition,
    example: Condition.Greater,
    description: 'شرط هشدار',
  })
  @IsEnum(Condition)
  condition!: Condition;

  @ApiProperty({
    example: 65000,
    description: 'مقدار هدف',
  })
  @IsNumber()
  value!: number;
}