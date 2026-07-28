import { PartialType } from '@nestjs/swagger';
import { CreateCryptomarketDto } from './create-cryptomarket.dto';

export class UpdateCryptomarketDto extends PartialType(CreateCryptomarketDto) {}
