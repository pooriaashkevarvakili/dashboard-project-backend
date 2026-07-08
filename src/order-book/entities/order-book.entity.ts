import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SIDE } from '../side.enum';

@Entity('orderBook')
export class OrderBook {
  @PrimaryGeneratedColumn()
  id!: number;
 @Column({ 
  type: 'enum', 
  enum: SIDE, 
  nullable: true,       
  default: 'ASK' 
})
  side!: SIDE;

  @Column('decimal', { precision: 18, scale: 8 })
  price!: number;

  @Column('decimal', { precision: 18, scale: 8 })
  amount!: number;
  @Column('decimal', { precision: 18, scale: 8,nullable: true,  })
  total!: number;
}
