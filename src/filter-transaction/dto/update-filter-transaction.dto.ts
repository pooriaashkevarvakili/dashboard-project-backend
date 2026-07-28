import { PartialType } from '@nestjs/swagger';
import { CreateFilterTransactionDto } from './create-filter-transaction.dto';

export class UpdateFilterTransactionDto extends PartialType(CreateFilterTransactionDto) {}
