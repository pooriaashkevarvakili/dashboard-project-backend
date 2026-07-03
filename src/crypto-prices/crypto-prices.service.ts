import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CryptoPrice } from './entities/crypto-price.entity';
import { CreateCryptoPriceDto } from './dto/create-crypto-price.dto';

@Injectable()
export class CryptoPricesService implements OnModuleInit {
  constructor(
    @InjectRepository(CryptoPrice)
    private readonly CryptoRepository: Repository<CryptoPrice>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    const count = await this.CryptoRepository.count();

    if (count > 0) return;
    await this.CryptoRepository.save([
      {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 67234.5,
        change: 2.45,
        icon: 'FaBitcoin',
        volume: '32.4B',
        marketCap: '1.32T',
      },
      {
        name: 'Ethereum',
        symbol: 'ETH',
        price: 3456.78,
        change: -1.23,
        icon: 'FaEthereum',
        volume: '18.7B',
        marketCap: '415.6B',
      },
      {
        name: 'Binance Coin',
        symbol: 'BNB',
        price: 589.12,
        change: 0.87,
        icon: 'SiBinance',
        volume: '5.2B',
        marketCap: '89.3B',
      },
      {
        name: 'Tether',
        symbol: 'USDT',
        price: 1,
        change: 0.01,
        icon: 'SiTether',
        volume: '68.1B',
        marketCap: '83.7B',
      },
      {
        name: 'Ripple',
        symbol: 'XRP',
        price: 0.6234,
        change: -0.45,
        icon: 'SiRipple',
        volume: '2.8B',
        marketCap: '33.9B',
      },
    ]);
  }

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
        icon: item.icon,

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
