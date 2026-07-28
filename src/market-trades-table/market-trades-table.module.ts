import { Module } from '@nestjs/common';
import { MarketTradesTableService } from './market-trades-table.service';
import { MarketTradesTableController } from './market-trades-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MarketTradesTable} from './entities/market-trades-table.entity'
@Module({
      imports: [TypeOrmModule.forFeature([MarketTradesTable])],
  
  controllers: [MarketTradesTableController],
  providers: [MarketTradesTableService],
})
export class MarketTradesTableModule {}
