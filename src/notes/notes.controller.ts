// src/notes/notes.controller.ts
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateNoteDto } from './dto/notes.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() body: CreateNoteDto) {
    return this.notesService.create(body);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }
   @Delete(":id")
  remove(@Param("id") id: string) {
    return this.notesService.remove(+id);
  }
}