import { PartialType } from '@nestjs/swagger';
import { CreateFuturesAssetstableDto } from './create-futures-assetstable.dto';

export class UpdateFuturesAssetstableDto extends PartialType(CreateFuturesAssetstableDto) {}
