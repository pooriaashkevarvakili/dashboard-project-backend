import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PositionSide } from '../position-side.enum';

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  symbol!: string;

  @Column({ type: 'enum', enum: PositionSide }) side!: PositionSide;

  @Column('decimal')
  size!: number;

  @Column('decimal')
  entryPrice!: number;

  @Column('decimal')
  markPrice!: number;

  @Column('decimal')
  pnl!: number;

  @Column('decimal')
  pnlPercent!: number;
}
