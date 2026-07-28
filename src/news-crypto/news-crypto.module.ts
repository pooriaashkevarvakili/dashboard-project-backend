import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoNewsController } from './news-crypto.controller';
import { CryptoNewsService } from './news-crypto.service';
import { CryptoNewsEntity } from './entities/news-crypto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoNewsEntity])],
  controllers: [CryptoNewsController],
  providers: [CryptoNewsService],
})
export class CryptoNewsModule {

}