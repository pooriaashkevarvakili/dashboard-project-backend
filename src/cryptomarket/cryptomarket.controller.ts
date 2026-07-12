// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CryptomarketService } from './cryptomarket.service';
import { CreateCryptomarketDto } from './dto/create-cryptomarket.dto';

@Controller('cryptoMarket')
export class CryptomarketController {
  constructor(private readonly cryptoMarketService: CryptomarketService) {}

  @Post()
  create(@Body() dto: CreateCryptomarketDto) {
    return this.cryptoMarketService.create(dto);
  }

  @Get('/all')
  findAll() {
    return this.cryptoMarketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cryptoMarketService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cryptoMarketService.remove(+id);
  }
}