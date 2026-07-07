import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {OrderStatus} from './OrderStatusEnum'
import { OrderTable } from './entities/order-table.entity';
import { CreateOrderTableDto } from './dto/create-order-table.dto';

@Injectable()
export class OrderTableService implements OnModuleInit {
  constructor(
    @InjectRepository(OrderTable)
    private readonly orderHistoryTable: Repository<OrderTable>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    const count = await this.orderHistoryTable.count();

    if (count > 0) {
      return;
    }

    const data = [
      {
        name: '#ORD-001',
        type: 'Buy',

        price: 64200,
        amount: 0.85,
        total: 54570,
        status: OrderStatus.Completed,
        time: '2026-07-03 14:32:21',
      },
      {
        name: '#ORD-002',
        type: 'Sell',
        price: 65800,
        amount: 0.42,
        total: 27636,
        status: OrderStatus.Completed,
        time: '2026-07-03 12:15:07',
      },
      {
        name: '#ORD-003',
        type: 'Buy',
        price: 63500,
        amount: 1.2,
        total: 76200,
        status: OrderStatus.Partial,
        time: '2026-07-02 22:45:33',
      },
      {
        name: '#ORD-004',
        type: 'Sell',
        price: 67000,
        amount: 0.5,
        total: 33500,
        status: OrderStatus.Pending,
        time: '2026-07-02 18:20:11',
      },
      {
        name: '#ORD-005',
        type: 'Buy',
        price: 62800,
        amount: 2.0,
        total: 125600,
        status: OrderStatus.Cancelled,
        time: '2026-07-02 09:05:42',
      },
      {
        name: '#ORD-006',
        type: 'Buy',
        price: 65500,
        amount: 0.3,
        total: 19650,
        status: OrderStatus.Completed,
        time: '2026-07-01 16:55:18',
      },
    ];

    const entities = this.orderHistoryTable.create(data);
    await this.orderHistoryTable.save(entities);
  }
  async create(dto: CreateOrderTableDto) {
    const transaction = this.orderHistoryTable.create(dto);
    return await this.orderHistoryTable.save(transaction);
  }

  async findAll() {
    const transactions = await this.orderHistoryTable.find({
      order: {
        id: 'ASC',
      },
    });

    return {
      message: 'پیام با موفقیت انجام شد',
      data: transactions.map((item) => ({
        key: item.id,
        type: item.type,
        total: item.total,
        amount: item.amount,
        price: item.price,
        time: item.time,
        name: item.name,
      })),
    };
  }

  async findOne(id: number) {
    return await this.orderHistoryTable.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    await this.orderHistoryTable.delete(id);

    return {
      message: 'Deleted successfully',
    };
  }
}
