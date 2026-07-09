// transaction.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, 
} from '@nestjs/common';
import { SpotAssetsService } from './spot-assets.service'
import { CreateSpotAssetDto } from './dto/create-spot-asset.dto';

@Controller('spotasset')
export class SpotAssetsController {
  constructor(private readonly positionColumnsTableController: SpotAssetsService) {}

  @Post()
  create(@Body() dto: CreateSpotAssetDto) {
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