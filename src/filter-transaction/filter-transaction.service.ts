import { Injectable } from '@nestjs/common';
import { CreateFilterTransactionDto } from './dto/create-filter-transaction.dto';
import { UpdateFilterTransactionDto } from './dto/update-filter-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {TransactionsFilter} from './entities/filter-transaction.entity'
import { Repository } from 'typeorm';
@Injectable()
export class FilterTransactionService {
   constructor(
      @InjectRepository(TransactionsFilter)
      private readonly transactionRepository: Repository<TransactionsFilter>,
    ) {}
  create(createFilterTransactionDto: CreateFilterTransactionDto) {
    return 'This action adds a new filterTransaction';
  }


async findAll(filters: CreateFilterTransactionDto) {
  // اگر جدول خالی بود، MockData را ذخیره کن

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
