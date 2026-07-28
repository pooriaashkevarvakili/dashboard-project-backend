import { DataSource } from 'typeorm';
import { Trader } from './entities/trader.entity';

export async function seedTraders(dataSource: DataSource) {
  const repo = dataSource.getRepository(Trader);
  
  // Clear existing data (optional)
  // await repo.clear();
  
  await repo.save([
    {
      name: 'CryptoWhale',
      isVerified: true,
      isStarred: true,
      totalPnL: 12450.80,
      pnlPercent: 34.2,
      winRate: 78.5,
      roi: 42.7,
      followers: 3421,
      aum: 1240000,
      avgTrade: 3200,
      tradesCount: 156,
      strategy: 'Scalping & Swing',
      riskLevel: 'Medium',
    },
    {
      name: 'AlphaTrader',
      isVerified: true,
      isStarred: false,
      totalPnL: 9820.30,
      pnlPercent: 28.6,
      winRate: 72.3,
      roi: 35.1,
      followers: 2856,
      aum: 980000,
      avgTrade: 2100,
      tradesCount: 203,
      strategy: 'Momentum',
      riskLevel: 'High',
    },
    {
      name: 'SmartInvestor',
      isVerified: false,
      isStarred: true,
      totalPnL: 7650.50,
      pnlPercent: 22.4,
      winRate: 68.9,
      roi: 29.8,
      followers: 2103,
      aum: 750000,
      avgTrade: 1800,
      tradesCount: 178,
      strategy: 'Value & Growth',
      riskLevel: 'Low',
    },
  ]);
}