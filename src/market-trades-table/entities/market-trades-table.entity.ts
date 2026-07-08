import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Isbuyer } from '../isBuyer.enum';

@Entity('marketTradeTable')
export class MarketTradesTable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: Isbuyer })
  isBuyer!: Isbuyer;      

  @Column('decimal', { precision: 18, scale: 8 })
  price!: number;

  @Column('decimal', { precision: 18, scale: 8 })
  amount!: number;

  @Column({ type: 'timestamp', nullable: true })
  time!: Date;                
}