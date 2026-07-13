import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('exchanges')
@Index(['name', 'pair'], { unique: true })
export class Exchange {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Exchange name',
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: 'Trading pair',
  })
  pair!: string;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 8,
    comment: 'Current price',
  })
  price!: number;

  @Column({
    type: 'decimal',
    precision: 30,
    scale: 8,
    default: 0,
    comment: '24h trading volume',
  })
  volume!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
    default: 0,
    comment: 'Spread percentage',
  })
  spread!: number;
 @Column({
    type: 'smallint',
    default: 0,
    comment: 'Trust score (0-100)',
  })
  trust!: number;


}