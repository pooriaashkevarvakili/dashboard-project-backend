import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trades')
export class TradeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 20 })
  pair!: string;

  @Column({ type: 'varchar', length: 20 })
  type!: string;

  @Column('numeric', {
    precision: 18,
    scale: 8,
  })
  amount!: number;

  @Column('numeric', {
    precision: 18,
    scale: 2,
  })
  price!: number;

  @Column('numeric', {
    precision: 18,
    scale: 2,
  })
  total!: number;

  @Column({ type: 'varchar', length: 50 })
  time!: string;

  @Column({ type: 'varchar', length: 50 })
  status!: string;
}