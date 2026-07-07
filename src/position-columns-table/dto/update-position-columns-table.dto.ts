import { PartialType } from '@nestjs/swagger';
import { CreatePositionColumnsTableDto } from './create-position-columns-table.dto';

export class UpdatePositionColumnsTableDto extends PartialType(CreatePositionColumnsTableDto) {}
