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
  async onModuleInit() {
    await this.seed();
  }
private async seed(): Promise<void> {
  const count = await this.transactionRepository.count();

  console.log('Seed Count Before:', count);

  if (count > 0) {
    return;
  }

  const data = [
      { date: '2026-01-12', price: 67234.50, volume: 28400000000, marketCap: 1320000000000 },
    { date: '2026-01-11', price: 65012.30, volume: 26100000000, marketCap: 1275000000000 },
    { date: '2026-01-10', price: 64123.80, volume: 23800000000, marketCap: 1257000000000 },
    { date: '2026-01-09', price: 65890.20, volume: 27400000000, marketCap: 1292000000000 },
    { date: '2026-01-08', price: 67210.50, volume: 29100000000, marketCap: 1318000000000 },
    { date: '2026-01-07', price: 68800.00, volume: 31200000000, marketCap: 1349000000000 },
    { date: '2026-01-06', price: 69500.30, volume: 29800000000, marketCap: 1363000000000 },
    { date: '2026-01-05', price: 68450.60, volume: 27700000000, marketCap: 1342000000000 },
    { date: '2026-01-04', price: 67123.40, volume: 25900000000, marketCap: 1316000000000 },
    { date: '2026-01-03', price: 66300.10, volume: 24100000000, marketCap: 1300000000000 },
    
  ];

  const entities = this.transactionRepository.create(data);

  await this.transactionRepository.save(entities);

  console.log('Seed Completed');
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
