import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateNoteDto } from './dto/notes.dto';
import { NoteEntity } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}

  async create(dto: CreateNoteDto) {
    const note = this.noteRepository.create({
      title: dto.title,
      content: dto.content,
      color: '#f6ffed',
    });

    const result = await this.noteRepository.save(note);

    return {
      success: true,
      data: result,
    };
  }

  async findAll() {
    return await this.noteRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async remove(id: number) {
    await this.noteRepository.delete(id);

    return {
      message: 'Deleted successfully',
    };
  }
}