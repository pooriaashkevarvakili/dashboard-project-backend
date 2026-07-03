import { PartialType } from '@nestjs/swagger';
import { CreateCryptoPriceDto } from './create-crypto-price.dto';

export class UpdateTransactionDto extends PartialType(CreateCryptoPriceDto) {}