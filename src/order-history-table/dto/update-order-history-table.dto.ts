// dto/update-transaction.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderHistoryDto } from './create-order-history-table.dto';

export class UpdateTransactionDto extends PartialType(CreateOrderHistoryDto) {}