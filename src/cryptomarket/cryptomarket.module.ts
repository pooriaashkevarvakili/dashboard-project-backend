import { Module } from '@nestjs/common';
import { CryptomarketService } from './cryptomarket.service';
import { CryptomarketController } from './cryptomarket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Cryptomarket} from './entities/cryptomarket.entity'
@Module({
          imports: [TypeOrmModule.forFeature([Cryptomarket])],
  
  controllers: [CryptomarketController],
  providers: [CryptomarketService],
})
export class CryptomarketModule {}
