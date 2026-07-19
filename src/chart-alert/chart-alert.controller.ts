import { Controller, Get, Query } from '@nestjs/common';
import { ChartAlertService } from "./chart-alert.service";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('chart-alert')
export class ChartAlertController {
  constructor(private readonly chartService: ChartAlertService) {}
  @ApiOperation({ summary: 'هشدار جدید اضافه شد' })
    @ApiResponse({ status: 200, description: 'هشدار باموفقیت داده شد' })
    @ApiResponse({ status: 404, description: 'هشدار یافت نشد' })
  @Get()

  getChart(
    @Query("symbol") symbol: string = "BTC",
  ) {
    return this.chartService.getChart(symbol);
  }
  @ApiResponse({ status: 200, description: 'هشدار جدید با موفقیت اضافه شد' })
  @Get("symbols")
  getSymbols() {
    return this.chartService.getSymbols();
  }
}

