import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TransactionType } from '../TransactionType.enum';

@Entity('transactions_filter')
export class TransactionsFilter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  coin!: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type!: TransactionType;

  @Column('decimal', {
    precision: 18,
    scale: 8,
  })
  amount!: number;

  @Column({
    nullable: true,
  })
  txId!: string;

  @Column({
    nullable: true,
  })
  address!: string;

  @Column({
    nullable: true,
  })
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}