import { Module } from '@nestjs/common';
import { CryptoPricesService } from './crypto-prices.service';
import { CryptoPricesController } from './crypto-prices.controller';
import {CryptoPrice} from './entities/crypto-price.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
      imports: [TypeOrmModule.forFeature([CryptoPrice])],
  
  controllers: [CryptoPricesController],
  providers: [CryptoPricesService],
})
export class CryptoPricesModule {}
