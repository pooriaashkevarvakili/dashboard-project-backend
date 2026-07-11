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
  async onModuleInit() {
    await this.seed();
  }
private async seed(): Promise<void> {
  const count = await this.transactionRepository.count();

  console.log('Seed Count Before:', count);

  if (count > 0) {
    return;
  }

  const data = [
    {

      name: 'Bitcoin',
      symbol: 'BTC',
      price: 65432.10,
      changePercent: 2.34,
      alert: true,
      sparklineData: [62000, 63000, 64000, 65000, 64500, 66000, 65432],
    },
    {
   
      name: 'Ethereum',
      symbol: 'ETH',
      price: 3421.50,
      changePercent: -1.12,
      alert: false,
      sparklineData: [3500, 3450, 3400, 3380, 3420, 3410, 3421]
    },
    {

      name: 'Cardano',
      symbol: 'ADA',
      price: 0.62,
      changePercent: 5.67,
      alert: true,
      sparklineData: [0.58, 0.59, 0.60, 0.61, 0.63, 0.64, 0.62],
    }
 
    
    
  ];

  const entities = this.transactionRepository.create(data);

  await this.transactionRepository.save(entities);

  console.log('Seed Completed');
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
