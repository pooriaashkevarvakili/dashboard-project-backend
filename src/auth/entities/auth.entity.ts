
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity('users')  
export class Auth {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ unique: true })  
  email!: string;
  
  @Column()
  password!: string;
  
  @Column({ unique: true })  
  username!: string;
}