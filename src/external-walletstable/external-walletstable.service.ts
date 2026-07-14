import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalWalletstable } from './entities/external-walletstable.entity';
import { CreateExternalWalletstableDto } from './dto/create-external-walletstable.dto';

@Injectable()
export class ExternalWalletstableService {
  constructor(
    @InjectRepository(ExternalWalletstable)
    private readonly positionTable: Repository<ExternalWalletstable>,
  ) {}


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
