import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CryptoPrice {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column()
  symbol!: string;
  @Column('float')
  price!: number;
  @Column('float')
  change!: number;
  @Column()
  volume!: string;
  @Column()
  marketCap!: string;
}