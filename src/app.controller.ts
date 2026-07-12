import { Controller, Delete, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import type { Response } from 'express';
import transactions from './data/transactions.json';
import news from './data/news.json'
import week from './data/week.json'
import AssetHeader from './data/AssetHeader.json'
import cryptoDescription from './data/CyrptoDescription.json'
import chartSeries from './data/chartSeries.json'
import stats from './data/stats.json'
import progressAssetDetails from './data/ProgressAssetDetails.json'
import recentTransactions from './data/recentTransactions.json'
import MarketStatus from './data/MarketStats.json'
import performanceSummaryTimeline from './data/PerformanceSummaryTimeLine.json'
import priceChart from './data/priceChart.json'
import coinInterview from './data/CoinInterview.json'
import NoteTitle from './data/notes.json'
import socialData from './data/SocialData.json'
import walletFooter from './data/walletFooter.json'
import statsCards from './data/StatCards.json'
import marketData from './data/marketData.json'
import holdersData from './data/HoldersData.json'
import holdersTabAddress from './data/holdersTabAddress.json'
import ReactionData from './data/ReactionData.json'
import currencyExchange from './data/CurrencyExchange.json'
import chartSeriesCanslick from './data/ChartSeriesCanslick.json'
type ChartData = {
  key: number;
  priceChart: number;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('image/codekhane')
  getImagepooria(@Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'public', 'codekhane.jpeg'));
  }
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

  @Get('transactions')
  application(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(transactions);
  }
    @Get('reactionData')
  reactionData(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(ReactionData);
  }
      @Get('holdersTabAddress')
  holdersTabAddress(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(holdersTabAddress);
  }
    @Get('holdersData')
  holdersData(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(holdersData);
  }
    @Get('socialData')
  socialData(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(socialData);
  }
   @Get('walletFooter')
  walletFooter(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(walletFooter);
  }
   @Get('currencyExchange')
  currencyExchange(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(currencyExchange);
  }
@Get('progressAssetDetails')
  progressAssetDetails(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(progressAssetDetails);
  }
   @Get('news')
  News(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(news);
  }  @Get('performanceSummaryTimeline')
  performanceSummaryTimeline(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(performanceSummaryTimeline);
  }
  @Get('NoteTitleAll')
async NoteTitleAll() {
  return this.appService.findAll();
}
   @Get('NoteTitle')
  NoteTitle(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(NoteTitle);
  }
  @Get('chartSeriesCanslick')
  chartSeriesCanslick(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(chartSeriesCanslick);
  }
   @Get('statsCards')
  statsCards(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(statsCards);
  }
    @Get('week')
  Week(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(week);
  }
    @Get('chartSeries')
  chartSeries(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(chartSeries);
  }
    @Get('cryptoDescription')
  cryptoDescription(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(cryptoDescription);
  }
  @Get('stats')
  stats(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(stats);
  }
    @Get('recentTransactions')
  recentTransactions(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(recentTransactions);
  }
     @Get('marketData')
  marketData(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(marketData);
  }
   @Get('MarketStatus')
  MarketStatus(@Res() res: Response): void {
        res.status(HttpStatus.OK).json(MarketStatus);

  }
@Get('AssetHeader')
AssetHeader(@Res() res: Response): void {
     res.status(HttpStatus.OK).json(AssetHeader);

}
@Get('priceChart')
priceChart(@Res() res: Response): void {
     res.status(HttpStatus.OK).json(priceChart);

}
@Get('coinInterview')
coinInterview(@Res() res: Response): void {
     res.status(HttpStatus.OK).json(coinInterview);

}
@Get('summary')
getSummary() {
  const totalInvested = 500000;

  const price = Math.floor(Math.random() * 10000) + 115000;

  const low = price - Math.floor(Math.random() * 1000);
  const high = price + Math.floor(Math.random() * 1000);

  const totalBalance = 8.25;

  const currentValue = Math.round(price * totalBalance);

  const roi =
    ((currentValue - totalInvested) / totalInvested) * 100;

  return {
    message: 'Summary loaded successfully',
    data: {
      price,
      priceRange: {
        low,
        high,
      },
      totalInvested,
      currentValue,
      roi: Number(roi.toFixed(2)),
      totalBalance,
    },
  };
}
}
