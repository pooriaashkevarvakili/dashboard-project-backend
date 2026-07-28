import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position-columns-table.entity';
import { CreatePositionColumnsTableDto } from './dto/create-position-columns-table.dto';
import { PositionSide } from './position-side.enum';

@Injectable()
export class PositionColumnsTableService   {
  constructor(
    @InjectRepository(Position)
    private readonly positionTable: Repository<Position>,
  ) {}


  async create(dto: CreatePositionColumnsTableDto) {
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
        symbol: item.symbol,
        size: item.size,
        entryPrice: item.entryPrice,
        markPrice: item.markPrice,
        pnl: item.pnl,
        pnlPercent: item.pnlPercent,
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
