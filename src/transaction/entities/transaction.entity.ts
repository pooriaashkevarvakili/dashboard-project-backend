import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  coin!: string;

  @Column()
  type!: string;

  @Column()
  amount!: string;

  @Column()
  price!: string;
  @Column()

side!:string
  @CreateDateColumn()
  createdAt!: Date;
}