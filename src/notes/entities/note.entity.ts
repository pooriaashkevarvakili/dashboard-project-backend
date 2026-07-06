import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  content!: string;
   @Column()
  title!: string;
   @Column()
  color!: string;
    @CreateDateColumn({
      type: 'timestamp', 
    })
    time!: Date;
}