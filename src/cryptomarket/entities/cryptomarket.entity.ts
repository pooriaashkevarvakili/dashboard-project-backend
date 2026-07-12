import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Cryptomarket')
export class Cryptomarket {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column('decimal', {
    precision: 18,
    scale: 8,
  })
  price!: number;
  @Column('json')
  coin!: {
    name: string;
    symbol: string;
  };
  @Column('float')
  marketCap!: number;
  @Column('float')
  volume!: number;
  @Column('float')
  circulatingSupply!: number;
    @Column('float')
  ath!: number;
   @Column('float',{nullable: true})
  alt!: number;
  @Column('simple-array', { nullable: true })
  change!: number[];
}