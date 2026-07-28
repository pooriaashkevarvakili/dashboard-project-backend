// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, 
} from '@nestjs/common';
import { OrderBookService } from './order-book.service'
import { CreateOrderBookDto } from './dto/create-order-book.dto';

@Controller('orderBook')
export class OrderBookController {
  constructor(private readonly OrderBookService: OrderBookService) {}

  @Post()
  create(@Body() dto: CreateOrderBookDto) {
    return this.OrderBookService.create(dto);
  }

  @Get('/all')
  findAll() {
    return this.OrderBookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.OrderBookService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.OrderBookService.remove(+id);
  }
}