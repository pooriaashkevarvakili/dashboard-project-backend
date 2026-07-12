import { Controller, Delete, Get, HttpStatus, Param, Res } from '@nestjs/common';
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
import ReactionData from './data/ReactionData.json'
import currencyExchange from './data/CurrencyExchange.json'
import chartSeriesCanslick from './data/ChartSeriesCanslick.json'
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
    @Get('reactionData')
  reactionData(@Res() res: Response): void {
    res.status(HttpStatus.OK).json(ReactionData);
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
