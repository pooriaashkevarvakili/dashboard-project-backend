import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('WalletTable')
export class WalletTable {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  name!: string;

  @Column()
  address!: string;



  @Column('decimal')
  value!: number;

  @Column('decimal')
  balance!: number;

  @Column()
  currency!: string

  @Column()
  status!: string;
}