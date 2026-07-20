import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeEntity } from './entities/tranactions-table.entity';
import { CreateTradeDto } from './dto/create-tranactions-table.dto';

@Injectable()
export class TranactionsTableService {

  constructor(
    @InjectRepository(TradeEntity)
    private readonly positionTable: Repository<TradeEntity>,
  ) {}


  private readonly mockTrades = [
    {
      id: 1,
      pair: 'BTC/USD',
      type: 'خرید',
      amount: 0.245,
      price: 62450,
      total: 15300.25,
      time: '۲ دقیقه پیش',
      status: 'تکمیل‌شده',
    },
    {
      id: 2,
      pair: 'ETH/USD',
      type: 'فروش',
      amount: 4.8,
      price: 3820,
      total: 18336,
      time: '۱۵ دقیقه پیش',
      status: 'تکمیل‌شده',
    },
    {
      id: 3,
      pair: 'SOL/USD',
      type: 'خرید',
      amount: 125.5,
      price: 98.4,
      total: 12349.2,
      time: '۱ ساعت پیش',
      status: 'در انتظار',
    },
  ];


  async findAll(page = 1, limit = 10) {
    const total = this.mockTrades.length;

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      message: 'لیست معاملات با موفقیت دریافت شد',
      data: this.mockTrades.slice(start, end),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }


async create(dto: CreateTradeDto) {
  const trade = {
    ...dto,
    id: this.mockTrades.length + 1,
  };

  this.mockTrades.push(trade);

  return trade;
}


  async findOne(id: number) {
    return this.mockTrades.find(
      (item) => item.id === id,
    ) ?? null;
  }


  async remove(id: number) {
    const index = this.mockTrades.findIndex(
      (item) => item.id === id,
    );

    if (index !== -1) {
      this.mockTrades.splice(index, 1);
    }

    return {
      message: 'Deleted successfully',
    };
  }
}