import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {MarketTradesTable}  from './entities/market-trades-table.entity';
import { CreateMarketTradesTableDto } from './dto/create-market-trades-table.dto';
import {Isbuyer} from './isBuyer.enum'
@Injectable()
export class MarketTradesTableService implements OnModuleInit {
  constructor(
    @InjectRepository(MarketTradesTable)
    private readonly positionTable: Repository<MarketTradesTable>,
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
  
 const data=[
  { price: 43218.50, amount: 0.45, time: new Date('2026-07-08T14:32:15'), isBuyer: Isbuyer.True },
          { price: 43215.75, amount: 1.25, time: new Date('2026-07-08T14:32:10'), isBuyer: Isbuyer.False },
          { price: 43222.00, amount: 0.85, time: new Date('2026-07-08T14:32:05'), isBuyer: Isbuyer.True },
          { price: 43219.25, amount: 0.65, time: new Date('2026-07-08T14:32:00'), isBuyer: Isbuyer.True },
          { price: 43224.50, amount: 1.10, time: new Date('2026-07-08T14:31:55'), isBuyer: Isbuyer.False },
          { price: 43217.80, amount: 0.75, time: new Date('2026-07-08T14:31:50'), isBuyer: Isbuyer.True },
          { price: 43221.00, amount: 1.45, time: new Date('2026-07-08T14:31:45'), isBuyer: Isbuyer.False },
          { price: 43216.25, amount: 0.90, time: new Date('2026-07-08T14:31:40'), isBuyer: Isbuyer.True },
          { price: 43223.75, amount: 0.55, time: new Date('2026-07-08T14:31:35'), isBuyer: Isbuyer.True },
          { price: 43218.00, amount: 1.80, time: new Date('2026-07-08T14:31:30'), isBuyer: Isbuyer.False },
          { price: 43220.50, amount: 0.70, time: new Date('2026-07-08T14:31:25'), isBuyer: Isbuyer.True },
          { price: 43215.00, amount: 1.35, time: new Date('2026-07-08T14:31:20'), isBuyer: Isbuyer.False },
          { price: 43225.25, amount: 0.95, time: new Date('2026-07-08T14:31:15'), isBuyer: Isbuyer.True },
          { price: 43219.80, amount: 1.05, time: new Date('2026-07-08T14:31:10'), isBuyer: Isbuyer.True },
          { price: 43217.00, amount: 0.60, time: new Date('2026-07-08T14:31:05'), isBuyer: Isbuyer.False },
          { price: 43222.75, amount: 1.15, time: new Date('2026-07-08T14:31:00'), isBuyer: Isbuyer.True },
          { price: 43214.50, amount: 0.80, time: new Date('2026-07-08T14:30:55'), isBuyer: Isbuyer.False },
          { price: 43223.00, amount: 1.50, time: new Date('2026-07-08T14:30:50'), isBuyer: Isbuyer.True },
          { price: 43218.25, amount: 0.65, time: new Date('2026-07-08T14:30:45'), isBuyer: Isbuyer.True },
          { price: 43221.50, amount: 1.20, time: new Date('2026-07-08T14:30:40'), isBuyer: Isbuyer.False }
 ]

  const entities = this.positionTable.create(data);
  await this.positionTable.save(entities);
}
  async create(dto: CreateMarketTradesTableDto) {
    const transaction = this.positionTable.create(dto);
    return await this.positionTable.save(transaction);
  }

  async findAll() {
    console.log('Count:', await this.positionTable.count());
    const transactions = await this.positionTable.find({
      order: {
        id: 'ASC',
      },
    });

    return {
      message: 'پیام با موفقیت انجام شد',
      data: transactions.map((item) => ({
        key: item.id,
        price: item.price,
        amount: item.amount,
        time: item.time,
        isBayer: item.isBuyer,
       

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
