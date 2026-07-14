import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { NewsCategory } from '../news.enum';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  summary!: string;

  @Column({
    type: 'enum',
    enum: NewsCategory,
  })
  category!: NewsCategory;

  @Column()
  source!: string;

  @Column()
  url!: string;

  @Column({ default: false })
  trending!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}