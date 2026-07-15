import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ type: 'bigint', default: 0 })
  timestamp!: number;

  @Column({ default: false })
  trending!: boolean;

  @Column()
  url!: string;
}