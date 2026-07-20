// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query, 
} from '@nestjs/common';
import { TranactionsTableService } from './tranactions-table.service'
import { CreateTradeDto } from './dto/create-tranactions-table.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {TradeEntity} from './entities/tranactions-table.entity'
@Controller('trade')
export class TranactionsTableController {
  constructor(private readonly tranactionsTableController: TranactionsTableService) {}

  @Post()
  create(@Body() dto: CreateTradeDto) {
    return this.tranactionsTableController.create(dto);
  }
@ApiOperation({ summary: ' ترید جدید اضافه شد ' })
  @ApiResponse({ status: 200, description: 'ترید جدید ', type: TradeEntity })
  @ApiResponse({ status: 404, description: 'ترید  یافت نشد' })


 @Get('/all')
findAll(
  @Query('page') page: string = '1',
  @Query('limit') limit: string = '10',
) {
  return this.tranactionsTableController.findAll(
    Number(page),
    Number(limit),
  );
}
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tranactionsTableController.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tranactionsTableController.remove(+id);
  }
}