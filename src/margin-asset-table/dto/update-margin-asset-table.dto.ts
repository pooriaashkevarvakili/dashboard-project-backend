import { PartialType } from '@nestjs/swagger';
import { CreateMarginAssetTableDto } from './create-margin-asset-table.dto';

export class UpdateMarginAssetTableDto extends PartialType(CreateMarginAssetTableDto) {}
