import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuturesAssetTable } from './entities/futures-assetstable.entity';
import { CreateFuturesAssetstableDto } from './dto/create-futures-assetstable.dto';

@Injectable()
export class FuturesAssetstableService implements OnModuleInit {
  constructor(
    @InjectRepository(FuturesAssetTable)
    private readonly positionTable: Repository<FuturesAssetTable>,
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
   key: "ETH-fut-2",
    currency: "ETH",
    name: "Ethereum",
    icon: "ETH",
    balance: 15,
    usdValue: 30000,
    available: 14,
    frozen: 1,
    change24h: -2.1,
    },
    {
      key: "SOL-fut-3",
    currency: "SOL",
    name: "Solana",
    icon: "SOL",
    balance: 250,
    usdValue: 37500,
    available: 220,
    frozen: 30,
    change24h: 6.7,
    },
    {
    key: "XRP-fut-4",
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
       key: "ADA-fut-5",
    currency: "ADA",
    name: "Cardano",
    icon: "ADA",
    balance: 2000,
    usdValue: 1000,
    available: 2000,
    frozen: 0,
    change24h: -4.0,
    }
  ];

  const entities = this.positionTable.create(data);
  await this.positionTable.save(entities);
}
  async create(dto: CreateFuturesAssetstableDto) {
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
