// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, 
} from '@nestjs/common';
import { OrderTableService } from './order-table.service'
import { CreateOrderTableDto } from './dto/create-order-table.dto';

@Controller('orderTable')
export class OrderTableController {
  constructor(private readonly OrderHistoryService: OrderTableService) {}

  @Post()
  create(@Body() dto: CreateOrderTableDto) {
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