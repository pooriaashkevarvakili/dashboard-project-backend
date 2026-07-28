import { PartialType } from '@nestjs/swagger';
import { CreateWalletTableDto } from './create-wallet-table.dto';

export class UpdateWalletTableDto extends PartialType(CreateWalletTableDto) {}
