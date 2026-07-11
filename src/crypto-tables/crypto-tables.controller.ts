// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CryptoTablesService } from './crypto-tables.service';
import { CreateCryptoDto } from './dto/create-crypto-table.dto';

@Controller('cryptoTables')
export class CryptoTablesController {
  constructor(private readonly cryptoPricesService: CryptoTablesService) {}

  @Post()
  create(@Body() dto: CreateCryptoDto) {
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