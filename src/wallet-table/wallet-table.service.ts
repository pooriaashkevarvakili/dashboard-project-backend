import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WalletTable } from './entities/wallet-table.entity';
import { CreateWalletTableDto } from './dto/create-wallet-table.dto';

@Injectable()
export class WalletTableService  {
  constructor(
    @InjectRepository(WalletTable)
    private readonly orderWallet: Repository<WalletTable>,
  ) {}



 
  async create(dto: CreateWalletTableDto) {
    const transaction = this.orderWallet.create(dto);
    return await this.orderWallet.save(transaction);
  }

  async findAll() {
    const transactions = await this.orderWallet.find({
      order: {
        id: 'ASC',
      },
    });

    return {
      message: 'پیام با موفقیت انجام شد',
      data: transactions.map((item) => ({
        key: item.id,
      name: item.name,
      address: item.address,
      balance: item.balance,
      value: item.value,
      currency: item.currency,
      type: item.type,
      status: item.status,
      })),
    };
  }

  async findOne(id: number) {
    return await this.orderWallet.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    await this.orderWallet.delete(id);

    return {
      message: 'Deleted successfully',
    };
  }
}
