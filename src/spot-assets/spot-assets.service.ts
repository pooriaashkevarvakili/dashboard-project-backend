import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpotAsset } from './entities/spot-asset.entity';
import { CreateSpotAssetDto } from './dto/create-spot-asset.dto';

@Injectable()
export class SpotAssetsService implements OnModuleInit {
  constructor(
    @InjectRepository(SpotAsset)
    private readonly positionTable: Repository<SpotAsset>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

private async seed() {
  const count = await this.positionTable.count();
console.log('Seed Count Before:', await this.positionTable.count());
  if (count > 0) {
    return;
  }
  
  const data = [
    {
      key: "BTC-spot-1",
    currency: "BTC",
    name: "Bitcoin",
    icon: "BTC",
    balance: 2.5,
    usdValue: 250000,
    available: 2.3,
    frozen: 0.2,
    change24h: 2.5,
    },
    {
     key: "ETH-spot-2",
    currency: "ETH",
    name: "Ethereum",
    icon: "ETH",
    balance: 32,
    usdValue: 64000,
    available: 30,
    frozen: 2,
    change24h: 5.1,
    },
    {
      key: "USDT-spot-3",
    currency: "USDT",
    name: "Tether",
    icon: "USDT",
    balance: 15000,
    usdValue: 15000,
    available: 14500,
    frozen: 500,
    change24h: 0.1,
    },
    {
     key: "BNB-spot-4",
    currency: "BNB",
    name: "Binance Coin",
    icon: "BNB",
    balance: 12.5,
    usdValue: 3500,
    available: 12,
    frozen: 0.5,
    change24h: -1.2,
    },
    {
       key: "SOL-spot-5",
    currency: "SOL",
    name: "Solana",
    icon: "SOL",
    balance: 180,
    usdValue: 27000,
    available: 180,
    frozen: 0,
    change24h: 8.3,
    },
    {
          key: "XRP-spot-6",
    currency: "XRP",
    name: "Ripple",
    icon: "XRP",
    balance: 5000,
    usdValue: 2750,
    available: 4800,
    frozen: 200,
    change24h: 0.5,
    },
    {
     key: "ADA-spot-7",
    currency: "ADA",
    name: "Cardano",
    icon: "ADA",
    balance: 2000,
    usdValue: 1000,
    available: 2000,
    frozen: 0,
    change24h: -4.0,
    },
    

 
  ];

  const entities = this.positionTable.create(data);
  await this.positionTable.save(entities);
}
  async create(dto: CreateSpotAssetDto) {
    const transaction = this.positionTable.create(dto);
    return await this.positionTable.save(transaction);
  }

  async findAll() {
    console.log('Count:', await this.positionTable.count());
    const transactions = await this.positionTable.find({
      order: {
        key: 'ASC',
      },
    });

    return {
      message: 'پیام با موفقیت انجام شد',
      data: transactions.map((item) => ({
        id:item.id,
        key: item.key,
        currency: item.currency,
        name: item.name,
        icon: item.icon,
        balance: item.balance,
        usdValue: item.usdValue,
        available: item.available,
          frozen: item.frozen, 
          change24h:item.change24h

      })),
    };
  }

  async findOne(id: number) {
    return await this.positionTable.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    await this.positionTable.delete(id);

    return {
      message: 'Deleted successfully',
    };
  }
}
