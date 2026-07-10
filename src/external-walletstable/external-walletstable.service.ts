import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalWalletstable } from './entities/external-walletstable.entity';
import { CreateExternalWalletstableDto } from './dto/create-external-walletstable.dto';

@Injectable()
export class ExternalWalletstableService implements OnModuleInit {
  constructor(
    @InjectRepository(ExternalWalletstable)
    private readonly positionTable: Repository<ExternalWalletstable>,
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
     key: "BTC-ext-1",
    currency: "BTC",
    name: "Ledger Nano",
    icon: "BTC",
    balance: 3.2,
    usdValue: 320000,
    available: 3.2,
    frozen: 0,
    change24h: 2.1,
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
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
   key: "DAI-ext-4",
    currency: "DAI",
    name: "MakerDAO Vault",
    icon: "DAI",
    balance: 5000,
    usdValue: 5000,
    available: 5000,
    frozen: 0,
    change24h: -0.2,
    },
    {
 key: "MATIC-ext-5",
    currency: "MATIC",
    name: "Polygon Staking",
    icon: "MATIC",
    balance: 10000,
    usdValue: 8000,
    available: 10000,
    frozen: 0,
    change24h: 12.5,
    }
  ];

  const entities = this.positionTable.create(data);
  await this.positionTable.save(entities);
}
  async create(dto: CreateExternalWalletstableDto) {
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
          change24h:item.change24h,
          address:item.address

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
