import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
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
import recentTransactions from './data/recentTransactions.json'
import MarketStatus from './data/MarketStats.json'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('image/codekhane')
  getImagepooria(@Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'public', 'codekhane.jpeg'));
  }
  @Get('transactions')
  application(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(transactions);
  }
   @Get('news')
  News(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(news);
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
   @Get('MarketStatus')
  MarketStatus(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(MarketStatus);
  }
 @Get('AssetHeader')
AssetHeader(@Res() res: Response): void {
  res.status(HttpStatus.OK).json({
    ...AssetHeader,
    date: new Date(),
  });
}
}
