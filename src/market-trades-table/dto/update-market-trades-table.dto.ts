import { PartialType } from '@nestjs/swagger';
import { CreateMarketTradesTableDto } from './create-market-trades-table.dto';

export class UpdateMarketTradesTableDto extends PartialType(CreateMarketTradesTableDto) {}
