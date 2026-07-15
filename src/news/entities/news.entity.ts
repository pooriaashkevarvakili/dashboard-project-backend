import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { NewsCategory } from '../news.enum';

@Entity('newsCrypto')
export class newsCrypto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  summary!: string;

  @Column()
  category!: string;

  @Column()
  source!: string;

  @Column({ type: 'bigint' })
  timestamp!: number;

  @Column({ default: false })
  trending!: boolean;

  @Column()
  url!: string;
}