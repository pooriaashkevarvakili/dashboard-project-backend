// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, 
} from '@nestjs/common';
import { WalletTableService } from './wallet-table.service';
import { CreateWalletTableDto } from './dto/create-wallet-table.dto';

@Controller('wallet')
export class WalletTableController {
  constructor(private readonly WalletTableService:WalletTableService ) {}

  @Post()
  create(@Body() dto: CreateWalletTableDto) {
    return this.WalletTableService.create(dto);
  }

  @Get('/all')
  findAll() {
    return this.WalletTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.WalletTableService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.WalletTableService.remove(+id);
  }
}