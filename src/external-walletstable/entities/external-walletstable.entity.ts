import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("external_wallet") 
export class ExternalWalletstable {
  @PrimaryGeneratedColumn()
  id!:number
  @PrimaryColumn()
  key!: string;

  @Column()
  currency!: string;

  @Column()
  name!: string;

  @Column({  nullable: true,
})
  address!: string;
  @Column()
  icon!: string;

  @Column({ type: "decimal", precision: 18, scale: 8 })
  balance!: number;

  @Column({ type: "decimal", precision: 18, scale: 2 })
  usdValue!: number;

  @Column({ type: "decimal", precision: 18, scale: 8 })
  available!: number;

  @Column({ type: "decimal", precision: 18, scale: 8 })
  frozen!: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  change24h!: number;
}