import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {  Condition } from '../Condition';
import {Indicator} from '../Indiactor'
@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  symbol!: string;

  @Column({
    type: 'enum',
    enum: Indicator,
  })
  indicator!: Indicator;

  @Column({
    type: 'enum',
    enum: Condition,
  })
  condition!: Condition;

  @Column('float')
  value!: number;
}