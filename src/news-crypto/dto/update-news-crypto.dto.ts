import { PartialType } from '@nestjs/mapped-types';
import { CreateCryptoNewsDto } from './create-news-crypto.dto';

export class UpdateCryptoNewsDto extends PartialType(CreateCryptoNewsDto) {}