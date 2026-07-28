import { Injectable } from '@nestjs/common';
import {CreateCryptomarketDto} from './dto/create-cryptomarket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Cryptomarket} from './entities/cryptomarket.entity'
import { Repository } from 'typeorm';

@Injectable()
export class CryptomarketService {
   constructor(
      @InjectRepository(Cryptomarket)
      private readonly cryptoMarket: Repository<Cryptomarket>,
    ) {}
  create(createFilterTransactionDto: CreateCryptomarketDto) {
    return 'This action adds a new filterTransaction';
  }


  findOne(id: number) {
    return `This action returns a #${id} filterTransaction`;
  }
async findAll(page = 1, limit = 10) {
  const [transactions, total] = await this.cryptoMarket.findAndCount({
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
      coin: item.coin,
      marketCap: item.marketCap,
      price: item.price,
      volume: item.volume,
      circulatingSupply: item.circulatingSupply,
      ath: item.ath,
      atl: item.atl, // یا اگر Entity را اصلاح کردی: item.atl
      change: item.change,
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
