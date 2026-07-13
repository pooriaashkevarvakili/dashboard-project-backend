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
import { ExchangesService } from './exchanges.service';
import { CreateExchangeDto } from './dto/create-exchange.dto';

@Controller('exchange')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Post()
  create(@Body() dto: CreateExchangeDto) {
    return this.exchangesService.create(dto);
  }

  @Get('/all')
  findAll(
   
  ) {
    return this.exchangesService.findAll(
    
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.exchangesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.exchangesService.remove(+id);
  }
}