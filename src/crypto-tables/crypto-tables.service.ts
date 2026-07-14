import { Injectable } from '@nestjs/common';
import { CreateCryptoDto } from './dto/create-crypto-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Crypto} from './entities/crypto-table.entity'
import { Repository } from 'typeorm';

@Injectable()
export class CryptoTablesService {
   constructor(
      @InjectRepository(Crypto)
      private readonly transactionRepository: Repository<Crypto>,
    ) {}
  create(createFilterTransactionDto: CreateCryptoDto) {
    return 'This action adds a new filterTransaction';
  }


  findOne(id: number) {
    return `This action returns a #${id} filterTransaction`;
  }
 async findAll() {
    const transactions = await this.transactionRepository.find({
      order: {
        id: 'ASC',
      },
    });

    return {
      message: 'پیام با موفقیت انجام شد',
      data: transactions.map((item) => ({
        key: item.id,
        name: item.name,
        symbol: item.symbol,

        price: item.price,
        changePercent: item.changePercent,

        alert: item.alert,
        sparklineData: item.sparklineData,
      })),
    };
  }
 

  remove(id: number) {
    return `This action removes a #${id} filterTransaction`;
  }
}
