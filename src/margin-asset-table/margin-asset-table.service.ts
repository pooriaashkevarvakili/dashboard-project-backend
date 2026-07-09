import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { marginAssetTable } from './entities/margin-asset-table.entity';
import { CreateMarginAssetTableDto } from './dto/create-margin-asset-table.dto';

@Injectable()
export class MarginAssetTableService implements OnModuleInit {
  constructor(
    @InjectRepository(marginAssetTable)
    private readonly positionTable: Repository<marginAssetTable>,
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
key: "BTC-mar-1",
    currency: "BTC",
    name: "Bitcoin",
    icon: "BTC",
    balance: 0.9,
    usdValue: 90000,
    available: 0.7,
    frozen: 0.2,
    change24h: 1.8,
    },
    {
  key: "ETH-mar-2",
    currency: "ETH",
    name: "Ethereum",
    icon: "ETH",
    balance: 10,
    usdValue: 20000,
    available: 9,
    frozen: 1,
    change24h: -0.5,
    },
    {
      key: "USDC-mar-3",
    currency: "USDC",
    name: "USD Coin",
    icon: "USDC",
    balance: 8000,
    usdValue: 8000,
    available: 7500,
    frozen: 500,
    change24h: 0.0,
    },
    {
   key: "LINK-mar-4",
    currency: "LINK",
    name: "Chainlink",
    icon: "LINK",
    balance: 120,
    usdValue: 1800,
    available: 110,
    frozen: 10,
    change24h: 7.2,
    },
   
  ];

  const entities = this.positionTable.create(data);
  await this.positionTable.save(entities);
}
  async create(dto: CreateMarginAssetTableDto) {
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
