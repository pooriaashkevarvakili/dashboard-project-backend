// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, 
} from '@nestjs/common';
import { MarketTradesTableService } from './market-trades-table.service'
import { CreateMarketTradesTableDto } from './dto/create-market-trades-table.dto';

@Controller('MarketTrade')
export class MarketTradesTableController {
  constructor(private readonly MarketTradeTableService: MarketTradesTableService) {}

  @Post()
  create(@Body() dto: CreateMarketTradesTableDto) {
    return this.MarketTradeTableService.create(dto);
  }

  @Get('/all')
  findAll() {
    return this.MarketTradeTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.MarketTradeTableService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.MarketTradeTableService.remove(+id);
  }
}