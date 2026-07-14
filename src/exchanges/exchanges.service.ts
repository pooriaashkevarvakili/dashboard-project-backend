import { Injectable } from '@nestjs/common';
import {CreateExchangeDto} from './dto/create-exchange.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Exchange} from './entities/exchange.entity'
import { Repository } from 'typeorm';

@Injectable()
export class ExchangesService {
   constructor(
      @InjectRepository(Exchange)
      private readonly exchageRepository: Repository<Exchange>,
    ) {}
  create(createFilterTransactionDto: CreateExchangeDto) {
    return 'This action adds a new filterTransaction';
  }


  findOne(id: number) {
    return `This action returns a #${id} filterTransaction`;
  }
async findAll(page = 1, limit = 10) {
  const [transactions, total] = await this.exchageRepository.findAndCount({
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
