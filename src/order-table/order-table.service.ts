import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {OrderStatus} from './OrderStatusEnum'
import { OrderTable } from './entities/order-table.entity';
import { CreateOrderTableDto } from './dto/create-order-table.dto';

@Injectable()
export class OrderTableService  {
  constructor(
    @InjectRepository(OrderTable)
    private readonly orderHistoryTable: Repository<OrderTable>,
  ) {}


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
        status:item.status
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
