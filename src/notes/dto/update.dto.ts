import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  content?: string;
}