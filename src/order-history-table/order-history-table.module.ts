import { Module } from '@nestjs/common';
import { OrderHistoryTableService } from './order-history-table.service';
import { OrderHistoryTableController } from './order-history-table.controller';
import {OrderHistoryTable} from './entities/order-history-table.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
      imports: [TypeOrmModule.forFeature([OrderHistoryTable])],
  
  controllers: [OrderHistoryTableController],
  providers: [OrderHistoryTableService],
})
export class OrderHistoryTableModule {}
