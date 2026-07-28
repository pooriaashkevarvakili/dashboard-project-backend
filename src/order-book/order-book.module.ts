import { Module } from '@nestjs/common';
import { OrderBookService } from './order-book.service';
import { OrderBookController } from './order-book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderBook } from './entities/order-book.entity';
@Module({
  imports: [TypeOrmModule.forFeature([OrderBook])],

  controllers: [OrderBookController],
  providers: [OrderBookService],
})
export class OrderBookModule {}
