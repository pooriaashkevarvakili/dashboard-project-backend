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
import {ApiOperation,ApiQuery,ApiResponse} from '@nestjs/swagger'
import { CryptomarketService } from './cryptomarket.service';
import { CreateCryptomarketDto } from './dto/create-cryptomarket.dto';
import {Cryptomarket} from './entities/cryptomarket.entity'
@Controller('cryptoMarket')
export class CryptomarketController {
  constructor(private readonly cryptoMarketService: CryptomarketService) {}

  @Post()
  create(@Body() dto: CreateCryptomarketDto) {
    return this.cryptoMarketService.create(dto);
  }
@ApiOperation({ summary: 'مارکت جدید خبر داده شد' })
  @ApiResponse({ status: 200, description: 'مارکت خبر', type: Cryptomarket })
  @ApiResponse({ status: 404, description: 'مارکت خبر یافت نشد' })

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