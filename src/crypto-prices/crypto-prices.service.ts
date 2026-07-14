import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CryptoPrice } from './entities/crypto-price.entity';
import { CreateCryptoPriceDto } from './dto/create-crypto-price.dto';

@Injectable()
export class CryptoPricesService {
  constructor(
    @InjectRepository(CryptoPrice)
    private readonly CryptoRepository: Repository<CryptoPrice>,
  ) {}




  async create(dto: CreateCryptoPriceDto) {
    const transaction = this.CryptoRepository.create(dto);
    return await this.CryptoRepository.save(transaction);
  }

  async findAll() {
    const transactions = await this.CryptoRepository.find({
      order: {
        id: 'ASC',
      },
    });

    return {
      message: 'پیام با موفقیت انجام شد',
      data: transactions.map((item) => ({
        key: item.id,
        name: item.name,
        symbol: item.symbol,

        price: item.price,
        change: item.change,

        volume: item.volume,
        marketCap: item.marketCap,
      })),
    };
  }

  async findOne(id: number) {
    return await this.CryptoRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    await this.CryptoRepository.delete(id);

    return {
      message: 'Deleted successfully',
    };
  }
}
