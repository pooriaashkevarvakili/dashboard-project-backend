import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import type { Response } from 'express';
import data from './data/transactions.json';
import dataOne from './data/news.json'
import dataTwo from './data/week.json'
import dataFour from './data/CyrptoDescription.json'
import dataThree from './data/chartSeries.json'
import dataFive from './data/stats.json'
import dataSix from './data/recentTransactions.json'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('image/codekhane')
  getImagepooria(@Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'public', 'codekhane.jpeg'));
  }
  @Get('transactions')
  application(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(data);
  }
   @Get('news')
  News(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataOne);
  }
    @Get('week')
  Week(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataTwo);
  }
    @Get('chartSeries')
  chartSeries(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataThree);
  }
    @Get('cryptoDescription')
  cryptoDescription(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataFour);
  }
  @Get('stats')
  stats(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataFive);
  }
    @Get('recentTransactions')
  recentTransactions(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(dataSix);
  }
}
