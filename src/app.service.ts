import { Injectable } from '@nestjs/common';
import { NoteEntity } from './notes/entities/note.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
        @InjectRepository(NoteEntity)
        private readonly NoteEntity: Repository<NoteEntity>
  ){
    
  }
  async findAll() {
  return this.NoteEntity.find();
}
  getHello(): string {
    return 'Hello World!';
  }
   async remove(id: number) {
    await this.NoteEntity.delete(id);

    return {
      message: 'Deleted successfully',
    };
  }
}
