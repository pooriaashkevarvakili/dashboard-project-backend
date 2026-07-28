// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CryptoPricesService } from './crypto-prices.service';
import { CreateCryptoPriceDto } from './dto/create-crypto-price.dto';

@Controller('cryptoPricesService')
export class CryptoPricesController {
  constructor(private readonly cryptoPricesService: CryptoPricesService) {}

  @Post()
  create(@Body() dto: CreateCryptoPriceDto) {
    return this.cryptoPricesService.create(dto);
  }

  @Get('/all')
  findAll() {
    return this.cryptoPricesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cryptoPricesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cryptoPricesService.remove(+id);
  }
}