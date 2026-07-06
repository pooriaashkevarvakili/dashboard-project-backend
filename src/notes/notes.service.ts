// src/notes/notes.service.ts

import { Injectable } from "@nestjs/common";
import { CreateNoteDto } from "./dto/notes.dto";

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

@Injectable()
export class NotesService {
  private notes: Note[] = [];

  create(dto: CreateNoteDto) {
    const note: Note = {
      id: Date.now(),
      title: dto.title,
      content: dto.content,
      createdAt: new Date(),
    };

    this.notes.push(note);

    return {
      success: true,
      data: note,
    };
  }

  findAll(): Note[] {
    return this.notes;
  }
}