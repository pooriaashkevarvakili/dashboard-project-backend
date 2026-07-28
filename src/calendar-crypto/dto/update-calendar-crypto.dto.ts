import { PartialType } from '@nestjs/swagger';
import { CreateCalendarCryptoDto } from './create-calendar-crypto.dto';

export class UpdateCalendarCryptoDto extends PartialType(CreateCalendarCryptoDto) {}
