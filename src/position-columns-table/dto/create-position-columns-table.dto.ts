
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PositionSide } from '../position-side.enum';

export class CreatePositionColumnsTableDto {
  @IsString()
  symbol!: string;

  @IsEnum(PositionSide)
  side!: PositionSide;

  @IsNumber()
  size!: number;

  @IsNumber()
  entryPrice!: number;

  @IsNumber()
  markPrice!: number;

  @IsNumber()
  pnl!: number;

  @IsNumber()
  pnlPercent!: number;
}

