import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WalletTable } from './entities/wallet-table.entity';
import { CreateWalletTableDto } from './dto/create-wallet-table.dto';

@Injectable()
export class WalletTableService implements OnModuleInit {
  constructor(
    @InjectRepository(WalletTable)
    private readonly orderWallet: Repository<WalletTable>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  private async seed() {
    const count = await this.orderWallet.count();

    if (count > 0) {
      return;
    }

    const data = [
      {
    name: "Main Wallet",
    address: "0x3a7b...1b2c3d4e",
    balance: 2.75,
    value: 180675,
    currency: "BTC",
    type: "Hot",
    status: "Active",
      },
      {
        name: "Cold Storage",
    address: "0x8f9e...7a6b5c4d",
    balance: 5.2,
    value: 341640,
    currency: "BTC",
    type: "Cold",
    status: "Active",
      },
      {
    name: "Exchange Wallet",
    address: "0x2c1d...4e5f6g7h",
    balance: 0.3,
    value: 19710,
    currency: "BTC",
    type: "Exchange",
    status: "Active",
      }
    ];

    const entities = this.orderWallet.create(data);
    await this.orderWallet.save(entities);
  }
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
