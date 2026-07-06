import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('orderHistoryTable')
export class OrderHistoryTable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;
   @Column()
  name!:string
@Column({
  default: 'buy',
})
side!: string;
  @Column('decimal')
  price!: number;

  @Column('decimal')
  amount!: number;

  @Column('decimal')
  total!: number;

  @Column({
  type: 'boolean',
  default: false,
})
  status!: boolean;

  @CreateDateColumn({
    type: 'timestamp', 
  })
  time!: Date;
}