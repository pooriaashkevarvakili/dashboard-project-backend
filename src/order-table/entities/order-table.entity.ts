import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../OrderStatusEnum';

@Entity('orderTable')
export class OrderTable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;
   @Column()
  name!:string

  @Column('decimal')
  price!: number;

  @Column('decimal')
  amount!: number;

  @Column('decimal')
  total!: number;

 @Column({
  type: 'enum',
  enum: OrderStatus,
})
status!: OrderStatus;

  @CreateDateColumn({
    type: 'timestamp', 
  })
  time!: Date;
}