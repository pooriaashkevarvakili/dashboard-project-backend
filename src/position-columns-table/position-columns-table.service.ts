import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position-columns-table.entity';
import { CreatePositionColumnsTableDto } from './dto/create-position-columns-table.dto';
import { PositionSide } from './position-side.enum';

@Injectable()
export class PositionColumnsTableService implements OnModuleInit {
  constructor(
    @InjectRepository(Position)
    private readonly positionTable: Repository<Position>,
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
  
  const data = [
    {
      symbol: 'BTCUSDT',
    side: PositionSide.Long,      
    size: 0.25,
      entryPrice: 64200,
      markPrice: 64850,
      pnl: 162.5,
      pnlPercent: 1.01,
    },
    {
      symbol: 'ETHUSDT',
    side: PositionSide.Short,      
      size: 3,
      entryPrice: 3450,
      markPrice: 3385,
      pnl: 195,
      pnlPercent: 1.88,
    },
    {
      symbol: 'BNBUSDT',
    side: PositionSide.Long,      
      size: 5,
      entryPrice: 585,
      markPrice: 572,
      pnl: -65,
      pnlPercent: -2.22,
    },
    {
      symbol: 'SOLUSDT',
    side: PositionSide.Short,      
      size: 20,
      entryPrice: 148,
      markPrice: 156,
      pnl: 160,
      pnlPercent: 5.41,
    },
    {
      symbol: 'XRPUSDT',
    side: PositionSide.Short,      
      size: 1500,
      entryPrice: 0.62,
      markPrice: 0.59,
      pnl: 45,
      pnlPercent: 4.84,
    },
    {
      symbol: 'ADAUSDT',
    side: PositionSide.Long,      
      size: 2500,
      entryPrice: 0.78,
      markPrice: 0.75,
      pnl: -75,
      pnlPercent: -3.85,
    },
    {
      symbol: 'DOGEUSDT',
    side: PositionSide.Long,      
      size: 8000,
      entryPrice: 0.145,
      markPrice: 0.152,
      pnl: 56,
      pnlPercent: 4.83,
    },
    

 
  ];

  const entities = this.positionTable.create(data);
  await this.positionTable.save(entities);
}
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
