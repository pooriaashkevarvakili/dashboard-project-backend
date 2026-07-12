import { Injectable } from '@nestjs/common';
import {CreateCryptomarketDto} from './dto/create-cryptomarket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Cryptomarket} from './entities/cryptomarket.entity'
import { Repository } from 'typeorm';

@Injectable()
export class CryptomarketService {
   constructor(
      @InjectRepository(Cryptomarket)
      private readonly transactionRepository: Repository<Cryptomarket>,
    ) {}
  create(createFilterTransactionDto: CreateCryptomarketDto) {
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

    coin: { name: 'Bitcoin', symbol: 'BTC' },
    price: 67500,
    marketCap: 1320000000000,
    volume: 28000000000,
    circulatingSupply: 19700000,
    ath: 69000,
    atl: 67.81,
    change: [65000, 66000, 67000, 66500, 68000, 67500, 67500],
    },
    {
   
   coin: { name: 'Ethereum', symbol: 'ETH' },
    price: 3500,
    marketCap: 420000000000,
    volume: 15000000000,
    circulatingSupply: 122000000,
    ath: 4800,
    atl: 0.43,
    change: [3400, 3450, 3600, 3550, 3500, 3520, 3500],
    },
    {

 coin: { name: 'Binance Coin', symbol: 'BNB' },
    price: 600,
    marketCap: 92000000000,
    volume: 2000000000,
    circulatingSupply: 153000000,
    ath: 690,
    atl: 0.039,
    change: [580, 590, 610, 605, 600, 595, 600],
    },{
        coin: { name: 'Solana', symbol: 'SOL' },
    price: 180,
    marketCap: 80000000000,
    volume: 3000000000,
    circulatingSupply: 440000000,
    ath: 260,
    atl: 0.50,
    change: [170, 175, 180, 178, 182, 185, 180],
    },
  {
     coin: { name: 'Cardano', symbol: 'ADA' },
    price: 0.62,
    marketCap: 22000000000,
    volume: 900000000,
    circulatingSupply: 35000000000,
    ath: 3.10,
    atl: 0.017,
    change: [0.58, 0.60, 0.63, 0.61, 0.62, 0.64, 0.62],
  }
 
    
    
  ];

  const entities = this.transactionRepository.create(data);

  await this.transactionRepository.save(entities);

  console.log('Seed Completed');
}

  findOne(id: number) {
    return `This action returns a #${id} filterTransaction`;
  }
async findAll(page = 1, limit = 10) {
  const [transactions, total] = await this.transactionRepository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    order: {
      id: 'ASC',
    },
  });

  return {
    message: 'اطلاعات با موفقیت دریافت شد',
    data: transactions.map((item) => ({
      id: item.id,
      coin: item.coin,
      marketCap: item.marketCap,
      price: item.price,
      volume: item.volume,
      circulatingSupply: item.circulatingSupply,
      ath: item.ath,
      atl: item.alt, // یا اگر Entity را اصلاح کردی: item.atl
      change: item.change,
    })),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
 

  remove(id: number) {
    return `This action removes a #${id} filterTransaction`;
  }
}
