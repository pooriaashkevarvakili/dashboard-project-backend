import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trader } from './entities/trader.entity';
import { QueryTraderDto } from './dto/query-trader.dto';

@Injectable()
export class TradersService implements OnModuleInit {
  constructor(
    @InjectRepository(Trader)
    private repo: Repository<Trader>,
  ) {}

  // ==============================
  //  SEED خودکار (در صورت خالی بودن جدول)
  // ==============================
  async onModuleInit() {
    const count = await this.repo.count();
    if (count === 0) {
      await this.seedTraders();
      console.log('✅ داده‌های اولیه تریدرها با موفقیت درج شدند.');
    }
  }

  private async seedTraders() {
    await this.repo.save([
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

  // ==============================
  //  دریافت لیست با جستجو، فیلتر و مرتب‌سازی پویا
  // ==============================
  async getTraders(query: QueryTraderDto) {
    const {
      search,
      page = 1,
      limit = 10,
      sortBy = 'rank',
      sortOrder = 'ASC',
      starred,
    } = query;

    const skip = (page - 1) * limit;
    const qb = this.repo.createQueryBuilder('trader');

    // ۱. جستجو در نام و استراتژی
    if (search) {
      qb.where(
        `trader.name ILIKE :search OR trader.strategy ILIKE :search`,
        { search: `%${search}%` },
      );
    }

    // ۲. فیلتر ستاره‌دارها
    if (starred !== undefined) {
      qb.andWhere('trader.isStarred = :starred', { starred });
    }

    // ۳. مرتب‌سازی پویا (با نگاشت rank به roi نزولی)
    let orderField = sortBy;
    let orderDirection = sortOrder;

    if (sortBy === 'rank') {
      // برای تب "Top Traders" بر اساس ROI نزولی مرتب می‌کنیم
      orderField = 'roi';
      orderDirection = 'DESC';
    }

    qb.orderBy(`trader.${orderField}`, orderDirection);

    const [data, total] = await qb
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ==============================
  //  سایر متدها (بدون تغییر)
  // ==============================
  async copyTrader(id: number, amount: number) {
    const trader = await this.repo.findOneBy({ id });
    if (!trader) throw new Error('Trader not found');
    trader.isCopying = true;
    trader.copyAmount = amount;
    return this.repo.save(trader);
  }

  async stopCopying(id: number) {
    await this.repo.update(id, {
      isCopying: false,
      copyAmount: null,
    });
    return { success: true };
  }

  async toggleStar(id: number) {
    const trader = await this.repo.findOneBy({ id });
    if (!trader) throw new Error('Trader not found');
    trader.isStarred = !trader.isStarred;
    return this.repo.save(trader);
  }

  async topPerformers(limit = 4) {
    return this.repo.find({
      order: { roi: 'DESC' },
      take: limit,
    });
  }
}