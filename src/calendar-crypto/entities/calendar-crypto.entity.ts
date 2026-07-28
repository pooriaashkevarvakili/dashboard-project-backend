import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { EventType } from '../type.enum';

@Entity('calendarCrypto')


export class CalendarCrypto {
    @PrimaryGeneratedColumn()
    id!:number
     @Column()
  description!: string;
   @Column()
  title!: string;
   @Column({
    type: 'timestamp',
  })
  eventDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({
    type: 'enum',
    enum: EventType,
  })
  type!: EventType;
}



