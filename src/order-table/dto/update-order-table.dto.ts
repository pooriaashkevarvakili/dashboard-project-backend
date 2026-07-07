import { PartialType } from '@nestjs/swagger';
import { CreateOrderTableDto } from './create-order-table.dto';

export class UpdateOrderTableDto extends PartialType(CreateOrderTableDto) {}
