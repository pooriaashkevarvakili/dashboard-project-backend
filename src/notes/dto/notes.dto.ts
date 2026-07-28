import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    example: 'My First Note',
    description: 'Title of the note',
  })
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'This is the content of my note.',
    description: 'Content of the note',
  })
  @IsString()
  @IsNotEmpty()
    @MinLength(1)

  content!: string;
}

