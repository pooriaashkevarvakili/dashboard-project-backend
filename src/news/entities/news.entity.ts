import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('newsCrypto')
export class newsCrypto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: '' })
  title!: string;

  @Column({ default: '' })
  summary!: string;

  @Column({ default: '' })
  category!: string;

  @Column({ default: '' })
  source!: string;

  @Column({ type: 'bigint', default: 0 })
  timestamp!: number;

  @Column({ default: false })
  trending!: boolean;

  @Column({ default: '' })
  url!: string;
}