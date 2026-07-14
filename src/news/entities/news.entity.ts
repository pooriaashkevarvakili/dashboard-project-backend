import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { NewsCategory } from '../news.enum';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title!: string;

  @Column({
    type: 'text',
  })
  summary!: string;

  @Column({
    type: 'enum',
    enum: NewsCategory,
  })
  category!: NewsCategory;

  @Column({
    type: 'varchar',
    length: 255,
  })
  source!: string;

  @Column({
    type: 'varchar',
    length: 500,
  })
  url!: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  trending!: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt!: Date;
}