import { IsOptional, IsString, IsNumber, IsBoolean, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryTraderDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @IsIn(['rank', 'followers', 'roi', 'winRate'])
  sortBy?: 'rank' | 'followers' | 'roi' | 'winRate' = 'rank';

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  starred?: boolean;
}