import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChartAlertService } from './chart-alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';

@ApiTags('Chart Alert')
@Controller('chart-alert')
export class ChartAlertController {
  constructor(private readonly chartService: ChartAlertService) {}

  @Get()
  @ApiOperation({ summary: 'دریافت اطلاعات نمودار' })
  @ApiResponse({
    status: 200,
    description: 'اطلاعات نمودار با موفقیت دریافت شد',
  })

  getChart(@Query('symbol') symbol = 'BTC') {
    return this.chartService.getChart(symbol);
  }
@Get('alerts')
@ApiOperation({ summary: 'دریافت لیست هشدارها' })
getAlerts() {
  return this.chartService.getAlerts();
}
  @Get('symbols')
  @ApiOperation({ summary: 'دریافت لیست نمادها' })
  @ApiResponse({
    status: 200,
    description: 'لیست نمادها',
  })
  getSymbols() {
    return this.chartService.getSymbols();
  }

  @Post('alerts')
  @ApiOperation({ summary: 'ایجاد هشدار جدید' })
  @ApiBody({ type: CreateAlertDto })
  @ApiResponse({
    status: 201,
    description: 'هشدار با موفقیت ایجاد شد',
  })
  @ApiResponse({
    status: 400,
    description: 'اطلاعات ورودی نامعتبر است',
  })
  createAlert(@Body() dto: CreateAlertDto) {
    return this.chartService.createAlert(dto);
  }
}