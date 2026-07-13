import { Injectable } from '@nestjs/common';
import {CreateExchangeDto} from './dto/create-exchange.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Exchange} from './entities/exchange.entity'
import { Repository } from 'typeorm';

@Injectable()
export class ExchangesService {
   constructor(
      @InjectRepository(Exchange)
      private readonly transactionRepository: Repository<Exchange>,
    ) {}
  create(createFilterTransactionDto: CreateExchangeDto) {
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
    {

 name: 'بایننس',
    pair: 'BTC/USDT',
    price: 67450,
    volume: 1234567890,
    spread: 0.02,
    trust: 98,
    },
    {
   
name: 'کوین‌بیس',
    pair: 'BTC/USD',
    price: 67480,
    volume: 456789012,
    spread: 0.05,
    trust: 96,
    },
    {

name: 'کراکن',
    pair: 'BTC/USD',
    price: 67460,
    volume: 234567890,
    spread: 0.04,
    trust: 95,
    },{
     name: 'کوکوین',
    pair: 'BTC/USDT',
    price: 67430,
    volume: 987654321,
    spread: 0.08,
    trust: 92,
    },
  {
 name: 'بیت‌فینکس',
    pair: 'BTC/USD',
    price: 67500,
    volume: 123456789,
    spread: 0.03,
    trust: 91,
  },
  {
      name: 'بایبیت',
    pair: 'BTC/USDT',
    price: 67420,
    volume: 876543210,
    spread: 0.12,
    trust: 88,
  }
 
    
    
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
      name: item.name,
      spread: item.spread,
      price: item.price,
      volume: item.volume,
      pair: item.pair,
      trust: item.trust,
    })),
  
  };
}
 

  remove(id: number) {
    return `This action removes a #${id} filterTransaction`;
  }
}
