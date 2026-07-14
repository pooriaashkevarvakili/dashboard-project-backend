import { PartialType } from '@nestjs/swagger';
import { GetNewsDto } from './create-news.dto';

export class UpdateNewsDto extends PartialType(GetNewsDto) {}
