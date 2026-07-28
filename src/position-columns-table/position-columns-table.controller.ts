// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, 
} from '@nestjs/common';
import { PositionColumnsTableService } from './position-columns-table.service'
import { CreatePositionColumnsTableDto } from './dto/create-position-columns-table.dto';

@Controller('positionColumns')
export class PositionColumnsTableController {
  constructor(private readonly positionColumnsTableController: PositionColumnsTableService) {}

  @Post()
  create(@Body() dto: CreatePositionColumnsTableDto) {
    return this.positionColumnsTableController.create(dto);
  }

  @Get('/all')
  findAll() {
    return this.positionColumnsTableController.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.positionColumnsTableController.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.positionColumnsTableController.remove(+id);
  }
}