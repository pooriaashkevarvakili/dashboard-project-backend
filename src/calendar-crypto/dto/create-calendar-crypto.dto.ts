import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { EventType } from '../type.enum';

export class CreateCalendarCryptoDto {
  @ApiProperty({
    example: 'Bitcoin Halving',
    description: 'Title of the crypto event',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'The next Bitcoin halving will reduce block rewards.',
    description: 'Description of the crypto event',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    example: '2026-04-18',
    description: 'Event date (YYYY-MM-DD)',
    type: String,
    format: 'date',
  })
  @IsDateString()
  eventDate!: string;

  @ApiProperty({
    enum: EventType,
    enumName: 'EventType',
    example: EventType.Halving,
    description: 'Type of crypto event',
  })
  @IsEnum(EventType)
  type!: EventType;
}