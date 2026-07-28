// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, 
} from '@nestjs/common';
import {MarginAssetTableService } from './margin-asset-table.service'
import { CreateMarginAssetTableDto } from './dto/create-margin-asset-table.dto';

@Controller('marginAsset')
export class MarginAssetTableController {
  constructor(private readonly MarginAssetTableService:MarginAssetTableService) {}

  @Post()
  create(@Body() dto: CreateMarginAssetTableDto) {
    return this.MarginAssetTableService.create(dto);
  }

  @Get('/all')
  findAll() {
    return this.MarginAssetTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.MarginAssetTableService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.MarginAssetTableService.remove(+id);
  }
}