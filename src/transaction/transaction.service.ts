import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService implements OnModuleInit {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    const count = await this.transactionRepository.count();

    if (count > 0) return;

    await this.transactionRepository.save([
      {
        coin: 'BTC',
        type: 'خرید',
        amount: '0.25',
        price: '$108,450',
      },
      {
        coin: 'ETH',
        type: 'فروش',
        amount: '1.5',
        price: '$3,520',
      },
      {
        coin: 'ETH',
        type: 'فروش',
        amount: '1.5',
        price: '$3,520',
      },
      {
        coin: 'ETH',
        type: 'فروش',
        amount: '1.5',
        price: '$3,520',
      },
      {
        coin: 'ETH',
        type: 'فروش',
        amount: '1.5',
        price: '$3,520',
      },
      {
        coin: 'ETH',
        type: 'فروش',
        amount: '1.5',
        price: '$3,520',
      },
      {
        coin: 'ETH',
        type: 'فروش',
        amount: '1.5',
        price: '$3,520',
      },
      {
        coin: 'ETH',
        type: 'فروش',
        amount: '1.5',
        price: '$3,520',
      },
      {
        coin: 'ETH',
        type: 'فروش',
        amount: '1.5',
        price: '$3,520',
      },
    ]);
  }

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