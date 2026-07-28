import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}





  async create(dto: CreateTransactionDto) {
    const transaction = this.transactionRepository.create(dto);
    return await this.transactionRepository.save(transaction);
  }

  async findAll() {
    const transactions = await this.transactionRepository.find({
      order: {
        id: 'ASC',
      },
    });

    return {
      message: 'پیام با موفقیت انجام شد',
      data: transactions.map((item) => ({
        key: item.id,
        coin: item.coin,
        type: item.type,
        amount: item.amount,
        price: item.price,
      })),
    };
  }

  async findOne(id: number) {
    return await this.transactionRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    await this.transactionRepository.delete(id);

    return {
      message: 'Deleted successfully',
    };
  }
}