import { PartialType } from '@nestjs/swagger';
import { CreateSpotAssetDto } from './create-spot-asset.dto';

export class UpdateSpotAssetDto extends PartialType(CreateSpotAssetDto) {}
