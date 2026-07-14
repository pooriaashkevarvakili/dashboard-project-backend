import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { marginAssetTable } from './entities/margin-asset-table.entity';
import { CreateMarginAssetTableDto } from './dto/create-margin-asset-table.dto';

@Injectable()
export class MarginAssetTableService {
  constructor(
    @InjectRepository(marginAssetTable)
    private readonly positionTable: Repository<marginAssetTable>,
  ) {}


  async create(dto: CreateMarginAssetTableDto) {
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
          change24h:item.change24h

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
