import { Controller, Get, Query } from '@nestjs/common';
type ChartData = {
  key: number;
  priceChart: number;
};
@Controller('chart-query')
export class ChartQueryController {
     @Get('ChartCoin')
getPriceChart() {
  const now = Date.now();
  const dayMs = 86400000;

  return {
    success: true,
    data: [
      { x: now - 29 * dayMs, y: 31200 },
      { x: now - 28 * dayMs, y: 31800 },
      { x: now - 27 * dayMs, y: 30500 },
      { x: now - 26 * dayMs, y: 29800 },
      { x: now - 25 * dayMs, y: 28900 },
      { x: now - 24 * dayMs, y: 29500 },
      { x: now - 23 * dayMs, y: 30100 },
      { x: now - 22 * dayMs, y: 31000 },
      { x: now - 21 * dayMs, y: 32500 },
      { x: now - 20 * dayMs, y: 33500 },
      { x: now - 19 * dayMs, y: 34200 },
      { x: now - 18 * dayMs, y: 33800 },
      { x: now - 17 * dayMs, y: 34500 },
      { x: now - 16 * dayMs, y: 35200 },
      { x: now - 15 * dayMs, y: 36000 },
      { x: now - 14 * dayMs, y: 35800 },
      { x: now - 13 * dayMs, y: 36500 },
      { x: now - 12 * dayMs, y: 37200 },
      { x: now - 11 * dayMs, y: 36800 },
      { x: now - 10 * dayMs, y: 37500 },
      { x: now - 9 * dayMs, y: 38000 },
      { x: now - 8 * dayMs, y: 39000 },
      { x: now - 7 * dayMs, y: 38500 },
      { x: now - 6 * dayMs, y: 39500 },
      { x: now - 5 * dayMs, y: 40200 },
      { x: now - 4 * dayMs, y: 41000 },
      { x: now - 3 * dayMs, y: 40500 },
      { x: now - 2 * dayMs, y: 41500 },
      { x: now - 1 * dayMs, y: 42000 },
      { x: now, y: 42800 },
    ],
  };
}
@Get('chartSeriesDataNumber')
chartSeriesDataNumber(@Query('timeframe') timeframe: string = '1W') {
  let data: ChartData[] = [];

  switch (timeframe) {
    case '1D':
      data = [
        { key: 1, priceChart: 38500 },
        { key: 2, priceChart: 38800 },
        { key: 3, priceChart: 39200 },
        { key: 4, priceChart: 38900 },
        { key: 5, priceChart: 39500 },
      ];
      break;

    case '1W':
      data = [
        { key: 1, priceChart: 22000 },
        { key: 2, priceChart: 25000 },
        { key: 3, priceChart: 24000 },
        { key: 4, priceChart: 28000 },
        { key: 5, priceChart: 32000 },
        { key: 6, priceChart: 34000 },
        { key: 7, priceChart: 39000 },
      ];
      break;

    case '1M':
      data = Array.from({ length: 30 }, (_, i) => ({
        key: i + 1,
        priceChart: 25000 + Math.floor(Math.random() * 15000),
      }));
      break;

    case '1Y':
      data = Array.from({ length: 12 }, (_, i) => ({
        key: i + 1,
        priceChart: 20000 + Math.floor(Math.random() * 30000),
      }));
      break;
  }

  return {
    message: 'پیام با موفقیت انجام شد',
    data,
  };
}
 @Get('ChartCoinData')
  ChartCoinData(@Query('timeframe') timeframe: string = '1M') {
    const now = Date.now();
    const dayMs = 86400000;

    let days = 30;

    switch (timeframe) {
      case '1W':
        days = 7;
        break;
      case '1M':
        days = 30;
        break;
      case '3M':
        days = 90;
        break;
      case '1Y':
        days = 365;
        break;
      case 'ALL':
        days = 730;
        break;
    }

    const data = Array.from({ length: days }, (_, i) => ({
      x: now - (days - 1 - i) * dayMs,
      y: 30000 + Math.floor(Math.random() * 15000),
    }));

    return {
      success: true,
      data,
    };
  }
}
