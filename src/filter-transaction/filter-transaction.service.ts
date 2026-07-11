import { Injectable } from '@nestjs/common';
import { CreateFilterTransactionDto } from './dto/create-filter-transaction.dto';
import { UpdateFilterTransactionDto } from './dto/update-filter-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {TransactionsFilter} from './entities/filter-transaction.entity'
import { Repository } from 'typeorm';
import {TransactionType} from './TransactionType.enum'
@Injectable()
export class FilterTransactionService {
   constructor(
      @InjectRepository(TransactionsFilter)
      private readonly transactionRepository: Repository<TransactionsFilter>,
    ) {}
  create(createFilterTransactionDto: CreateFilterTransactionDto) {
    return 'This action adds a new filterTransaction';
  }

private async seed(): Promise<void> {
  const count = await this.transactionRepository.count();

  console.log('Seed Count Before:', count);

  if (count > 0) {
    return;
  }

  const data = [
    {
      coin: 'BTC',
      type: TransactionType.Deposit,
      amount: 0.45,
      txId: '0x111',
      address: '',
      description: 'BTC Deposit',
      createdAt: new Date('2026-07-10T09:30:00Z'),
    },
    {
      coin: 'ETH',
      type: TransactionType.Buy,
      amount: 12.5,
      txId: '0x222',
      address: '',
      description: 'Buy ETH',
      createdAt: new Date('2026-07-11T10:00:00Z'),
    },
    {
      coin: 'USDT',
      type: TransactionType.Withdraw,
      amount: 500,
      txId: '0x333',
      address: '',
      description: 'Withdraw USDT',
      createdAt: new Date('2026-07-12T11:00:00Z'),
    },
    {
      coin: 'BTC',
      type: TransactionType.Sell,
      amount: 0.15,
      txId: '0x444',
      address: '',
      description: 'Sell BTC',
      createdAt: new Date('2026-07-13T09:20:00Z'),
    },
    {
      coin: 'BNB',
      type: TransactionType.Swap,
      amount: 20,
      txId: '0x555',
      address: '',
      description: 'Swap BNB to USDT',
      createdAt: new Date('2026-07-14T13:40:00Z'),
    },
    {
      coin: 'ETH',
      type: TransactionType.Deposit,
      amount: 3,
      txId: '0x666',
      address: '',
      description: 'ETH Deposit',
      createdAt: new Date('2026-07-15T08:00:00Z'),
    },
    {
      coin: 'BTC',
      type: TransactionType.Withdraw,
      amount: 0.08,
      txId: '0x777',
      address: '',
      description: 'BTC Withdraw',
      createdAt: new Date('2026-07-16T15:00:00Z'),
    },
    {
      coin: 'SOL',
      type: TransactionType.Buy,
      amount: 40,
      txId: '0x888',
      address: '',
      description: 'Buy SOL',
      createdAt: new Date('2026-07-17T18:30:00Z'),
    },
  ];

  const entities = this.transactionRepository.create(data);

  await this.transactionRepository.save(entities);

  console.log('Seed Completed');
}
async findAll(filters: CreateFilterTransactionDto) {
  // اگر جدول خالی بود، MockData را ذخیره کن
  await this.seed();

  const query = this.transactionRepository.createQueryBuilder('transaction');

  if (filters.search) {
    query.andWhere(
      `(transaction.coin LIKE :search
      OR transaction.txId LIKE :search
      OR transaction.address LIKE :search
      OR transaction.description LIKE :search)`,
      {
        search: `%${filters.search}%`,
      },
    );
  }

  if (filters.type) {
    query.andWhere('transaction.type = :type', {
      type: filters.type,
    });
  }

  if (filters.coin) {
    query.andWhere('transaction.coin = :coin', {
      coin: filters.coin,
    });
  }

  if (filters.from) {
    query.andWhere('transaction.createdAt >= :from', {
      from: filters.from,
    });
  }

  if (filters.to) {
    query.andWhere('transaction.createdAt <= :to', {
      to: filters.to,
    });
  }

  query.orderBy('transaction.createdAt', 'DESC');

  return await query.getMany();
}
  findOne(id: number) {
    return `This action returns a #${id} filterTransaction`;
  }

  update(id: number, updateFilterTransactionDto: UpdateFilterTransactionDto) {
    return `This action updates a #${id} filterTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} filterTransaction`;
  }
}
