import { IsBoolean, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { NewsCategory } from '../news.enum';

export class CreateNewsDto {
  @IsString()
  title!: string;

  @IsString()
  summary!: string;

  @IsEnum(NewsCategory)
  category!: NewsCategory;

  @IsString()
  source!: string;

  @IsUrl()
  url!: string;

  @IsOptional()
  @IsBoolean()
  trending?: boolean;
}