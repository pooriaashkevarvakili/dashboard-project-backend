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
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.cryptoMarketService.findAll(
      Number(page),
      Number(limit),
    );
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