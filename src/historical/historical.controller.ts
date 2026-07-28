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
import { HistoricalService } from './historical.service';
import { CreateHistoricalDto } from './dto/create-historical.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {Historical} from './entities/historical.entity'
@Controller('historical')
export class HistoricalController {
  constructor(private readonly HistoricalService: HistoricalService) {}

  @Post()
  create(@Body() dto: CreateHistoricalDto) {
    return this.HistoricalService.create(dto);
  }
@ApiOperation({ summary: 'هیزتوریکال    داده شد' })
  @ApiResponse({ status: 200, description: 'هیزتوریکال جدید داده شد', type: Historical })
  @ApiResponse({ status: 404, description: ' هیزتوریکال یافت نشد' })

  @Get('/all')
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.HistoricalService.findAll(
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.HistoricalService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.HistoricalService.remove(+id);
  }
}