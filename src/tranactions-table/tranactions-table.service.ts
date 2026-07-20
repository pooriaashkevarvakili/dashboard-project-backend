import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeEntity } from './entities/tranactions-table.entity';
import { CreateTradeDto } from './dto/create-tranactions-table.dto';

@Injectable()
export class TranactionsTableService   {
  constructor(
    @InjectRepository(TradeEntity)
    private readonly positionTable: Repository<TradeEntity>,
  ) {}


  async create(dto: CreateTradeDto) {
    const transaction = this.positionTable.create(dto);
    return await this.positionTable.save(transaction);
  }

  async findAll(page = 1, limit = 10) {
    console.log('Count:', await this.positionTable.count());
    const [transactions, total] = await this.positionTable.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: {
      id: 'ASC',
    },
  });

    return {
      message: 'پیام با موفقیت انجام شد',
      data: transactions.map((item) => ({
        id: item.id,
        pair: item.pair,
        type: item.type,
        amount: item.amount,
        price: item.price,
        total: item.total,
        time: item.time,
          status: item.status, 

      })),
       pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
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
