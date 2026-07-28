// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, 
} from '@nestjs/common';
import {ExternalWalletstableService } from './external-walletstable.service'
import { CreateExternalWalletstableDto } from './dto/create-external-walletstable.dto';

@Controller('externalnalWallet')
export class ExternalWalletstableController {
  constructor(private readonly ExternalWalletstableService:ExternalWalletstableService) {}

  @Post()
  create(@Body() dto: CreateExternalWalletstableDto) {
    return this.ExternalWalletstableService.create(dto);
  }

  @Get('/all')
  findAll() {
    return this.ExternalWalletstableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ExternalWalletstableService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ExternalWalletstableService.remove(+id);
  }
}