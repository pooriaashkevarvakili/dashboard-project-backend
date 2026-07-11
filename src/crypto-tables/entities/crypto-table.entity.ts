import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cryptos')
export class Crypto {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  symbol!: string;

  @Column('decimal', {
    precision: 18,
    scale: 8,
  })
  price!: number;

  @Column('float')
  changePercent!: number;

  @Column({ default: false })
  alert!: boolean;

  @Column('simple-array', { nullable: true })
  sparklineData!: number[];
}