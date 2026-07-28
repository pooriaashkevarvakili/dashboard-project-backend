// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, 
} from '@nestjs/common';
import { OrderHistoryTableService } from './order-history-table.service';
import { CreateOrderHistoryDto } from './dto/create-order-history-table.dto';

@Controller('orderHistoryTable')
export class OrderHistoryTableController {
  constructor(private readonly OrderHistoryService: OrderHistoryTableService) {}

  @Post()
  create(@Body() dto: CreateOrderHistoryDto) {
    return this.OrderHistoryService.create(dto);
  }

  @Get('/all')
  findAll() {
    return this.OrderHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.OrderHistoryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.OrderHistoryService.remove(+id);
  }
}