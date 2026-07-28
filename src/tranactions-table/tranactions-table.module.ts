import { Module } from '@nestjs/common';
import { TranactionsTableService } from './tranactions-table.service';
import { TranactionsTableController } from './tranactions-table.controller';
import {TradeEntity} from './entities/tranactions-table.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([TradeEntity])],
  controllers: [TranactionsTableController],
  providers: [TranactionsTableService],
})
export class TranactionsTableModule {}
