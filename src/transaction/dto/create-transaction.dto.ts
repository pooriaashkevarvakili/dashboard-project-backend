import { IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  coin!: string;

  @IsString()
  type!: string;

  @IsString()
  amount!: string;

  @IsString()
  price!: string;
}