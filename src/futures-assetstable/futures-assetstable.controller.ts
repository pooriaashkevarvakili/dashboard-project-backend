// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, 
} from '@nestjs/common';
import {FuturesAssetstableService } from './futures-assetstable.service'
import { CreateFuturesAssetstableDto } from './dto/create-futures-assetstable.dto';

@Controller('futuresAsset')
export class FuturesAssetstableController {
  constructor(private readonly FuturesAssetstableService:FuturesAssetstableService) {}

  @Post()
  create(@Body() dto: CreateFuturesAssetstableDto) {
    return this.FuturesAssetstableService.create(dto);
  }

  @Get('/all')
  findAll() {
    return this.FuturesAssetstableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.FuturesAssetstableService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.FuturesAssetstableService.remove(+id);
  }
}