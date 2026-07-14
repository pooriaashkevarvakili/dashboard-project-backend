import { PartialType } from '@nestjs/swagger';
import { GetNewsDto } from './get-news.dto';

export class UpdateNewsDto extends PartialType(GetNewsDto) {}
