import { PartialType } from '@nestjs/swagger';
import { CreateExternalWalletstableDto } from './create-external-walletstable.dto';

export class UpdateExternalWalletstableDto extends PartialType(CreateExternalWalletstableDto) {}
