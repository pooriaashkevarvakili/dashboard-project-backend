import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {MarketTradesTable}  from './entities/market-trades-table.entity';
import { CreateMarketTradesTableDto } from './dto/create-market-trades-table.dto';
import {Isbuyer} from './isBuyer.enum'
@Injectable()
export class MarketTradesTableService  {
  constructor(
    @InjectRepository(MarketTradesTable)
    private readonly positionTable: Repository<MarketTradesTable>,
  ) {}



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
