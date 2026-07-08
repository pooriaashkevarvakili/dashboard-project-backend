import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {OrderBook}  from './entities/order-book.entity';
import { CreateOrderBookDto } from './dto/create-order-book.dto';
import {SIDE} from './side.enum'
@Injectable()
export class OrderBookService implements OnModuleInit {
  constructor(
    @InjectRepository(OrderBook)
    private readonly positionTable: Repository<OrderBook>,
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
  { price: 43280, amount: 1.05, total: 45444, side: SIDE.ask },
  { price: 43275, amount: 1.95, total: 84386.25, side: SIDE.ask },
  { price: 43270, amount: 0.70, total: 30289, side: SIDE.ask  },
  { price: 43265, amount: 1.30, total: 56244.5, side: SIDE.ask  },
  { price: 43260, amount: 0.85, total: 36771, side: SIDE.ask  },
  { price: 43255, amount: 1.65, total: 71370.75, side: SIDE.ask  },
  { price: 43250, amount: 0.75, total: 32437.5, side: SIDE.ask  },
  { price: 43245, amount: 1.10, total: 47569.5, side: SIDE.ask  },
  { price: 43240, amount: 2.20, total: 95128, side: SIDE.ask  },
  { price: 43235, amount: 0.95, total: 41073.25, side: SIDE.ask  },
  { price: 43230, amount: 1.45, total: 62683.5, side: SIDE.ask  },
  { price: 43225, amount: 0.80, total: 34580, side: SIDE.ask  },
  { price: 43160, amount: 1.25, total: 53950, side: SIDE.bid },
  { price: 43155, amount: 0.85, total: 36681.75, side: SIDE.bid },
  { price: 43150, amount: 2.10, total: 90615, side: SIDE.bid },
  { price: 43145, amount: 0.65, total: 28044.25, side:SIDE.bid },
  { price: 43140, amount: 1.45, total: 62553, side: SIDE.bid },
  { price: 43135, amount: 0.95, total: 40978.25, side:SIDE.bid },
  { price: 43130, amount: 1.80, total: 77634, side: SIDE.bid },
  { price: 43125, amount: 0.75, total: 32343.75, side: SIDE.bid },
  { price: 43120, amount: 1.35, total: 58212, side:SIDE.bid },
  { price: 43115, amount: 0.90, total: 38803.5, side: SIDE.bid },
  { price: 43110, amount: 2.05, total: 88375.5, side: SIDE.bid },
  { price: 43105, amount: 1.15, total: 49570.75, side: SIDE.bid },
 ]

  const entities = this.positionTable.create(data);
  await this.positionTable.save(entities);
}
  async create(dto: CreateOrderBookDto) {
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
         total:item.total,
        side: item.side,
       

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
