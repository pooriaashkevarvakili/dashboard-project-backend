import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {OrderBook}  from './entities/order-book.entity';
import { CreateOrderBookDto } from './dto/create-order-book.dto';
import {SIDE} from './side.enum'
@Injectable()
export class OrderBookService  {
  constructor(
    @InjectRepository(OrderBook)
    private readonly positionTable: Repository<OrderBook>,
  ) {}

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
