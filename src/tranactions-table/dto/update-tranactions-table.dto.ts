import { PartialType } from '@nestjs/swagger';
import { CreateTradeDto } from './create-tranactions-table.dto';

export class UpdateTranactionsTableDto extends PartialType(CreateTradeDto) {}
