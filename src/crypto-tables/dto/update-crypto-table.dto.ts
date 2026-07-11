import { PartialType } from '@nestjs/swagger';
import { CreateCryptoDto } from './create-crypto-table.dto';

export class UpdateCryptoTableDto extends PartialType(CreateCryptoDto) {}
