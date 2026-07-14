import { Injectable } from '@nestjs/common';
import {CreateHistoricalDto} from './dto/create-historical.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Historical} from './entities/historical.entity'
import { Repository } from 'typeorm';

@Injectable()
export class HistoricalService {
   constructor(
      @InjectRepository(Historical)
      private readonly transactionRepository: Repository<Historical>,
    ) {}
  create(createFilterTransactionDto: CreateHistoricalDto) {
    return 'This action adds a new filterTransaction';
  }


  findOne(id: number) {
    return `This action returns a #${id} filterTransaction`;
  }
async findAll(page = 1, limit = 10) {
  const [transactions, total] = await this.transactionRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: {
      id: 'ASC',
    },
  });

  return {
    message: 'اطلاعات با موفقیت دریافت شد',
    data: transactions.map((item) => ({
      id: item.id,
      date: item.date,
      marketCap: item.marketCap,
      price: item.price,
      volume: item.volume,

    })),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
 

  remove(id: number) {
    return `This action removes a #${id} filterTransaction`;
  }
}
