import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { newsCrypto } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { GetNewsDto } from './dto/get-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(newsCrypto)
    private readonly newsRepository: Repository<newsCrypto>,
  ) {}

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }

  async onApplicationBootstrap() {
    await this.seedInitialData();
  }

  // ====== متد Seed با بازگرداندن نتیجه و خطا ======
  public async seedInitialData(): Promise<{ success: boolean; message: string; count?: number }> {
    console.log('🚀 شروع Seed...');
    try {
      const count = await this.newsRepository.count();
      console.log(`📊 تعداد رکوردهای موجود: ${count}`);

      if (count > 0) {
        const sample = await this.newsRepository.findOne({ where: {} });
        if (sample && sample.title && sample.title.trim().length > 0) {
          console.log('✅ داده‌ها معتبر هستند. تعداد:', count);
          return { success: true, message: 'داده‌ها از قبل معتبر هستند.', count };
        } else {
          console.log('⚠️ داده‌های موجود نامعتبر هستند. پاک کردن...');
          await this.newsRepository.clear();
          console.log('✅ جدول خالی شد.');
        }
      }

      // آرایه ۷ خبر
      const initialNews = [
        {
          title: 'بیت‌کوین از مرز ۷۲,۰۰۰ دلار عبور کرد؛ ورود نهادی‌ها به اوج رسید',
          summary: 'بیت‌کوین با شکستن مقاومت ۷۲,۰۰۰ دلاری، تحت تأثیر رکوردشکنی ورود سرمایه‌های نهادی به صندوق‌های ETF و افزایش پذیرش در میان مؤسسات مالی سنتی قرار گرفت.',
          category: 'bitcoin',
          source: 'کویندسک',
          timestamp: Date.now() - 1000 * 60 * 15,
          trending: true,
          url: '#',
        },
        {
          title: 'افزایش بی‌سابقه فعالیت در لایه‌۲ اتریوم؛ آربیتروم و آپتیمیسم رکورد زدند',
          summary: 'تعداد آدرس‌های فعال روزانه در شبکه‌های لایه‌۲ اتریوم به بالاترین سطح خود رسیده و آربیتروم پیشتاز است. کارمزد تراکنش‌ها همچنان پایین مانده و فعالیت دی‌فای را افزایش داده است.',
          category: 'ethereum',
          source: 'بلاک',
          timestamp: Date.now() - 1000 * 60 * 45,
          trending: true,
          url: '#',
        },
        {
          title: 'تصویب قوانین جدید نگهداری رمزارز توسط SEC؛ گامی بزرگ برای نهادهای مالی',
          summary: 'کمیسیون بورس و اوراق بهادار آمریکا قوانین نهایی نگهداری از دارایی‌های دیجیتال را تصویب کرد که به عنوان سیگنالی صعودی برای محصولات رمزارزی تحت نظارت تلقی می‌شود.',
          category: 'regulation',
          source: 'بلومبرگ کریپتو',
          timestamp: Date.now() - 1000 * 60 * 120,
          trending: false,
          url: '#',
        },
        {
          title: 'بازار NFT نشانه‌های بهبود را نشان می‌دهد؛ کلکسیون‌های شاخص ۴۰٪ رشد کردند',
          summary: 'پس از یک بازار نزولی طولانی، فضای NFT با بازگشت علاقه مواجه شده و کلکسیون‌هایی مثل Bored Ape Yacht Club و CryptoPunks رشد دو رقمی ثبت کرده‌اند.',
          category: 'nft',
          source: 'دکریپت',
          timestamp: Date.now() - 1000 * 60 * 180,
          trending: false,
          url: '#',
        },
        {
          title: 'ارزش کل قفل‌شده در پروتکل‌های دی‌فای از ۱۰۰ میلیارد دلار عبور کرد',
          summary: 'مجموع ارزش قفل‌شده در پروتکل‌های مالی غیرمتمرکز برای اولین بار پس از ۲۰۲۲ از مرز ۱۰۰ میلیارد دلار گذشت که ناشی از بازگشت فرصت‌های سوددهی و مشتقات نقدشوندگی جدید است.',
          category: 'defi',
          source: 'دی‌فای‌لاما',
          timestamp: Date.now() - 1000 * 60 * 240,
          trending: true,
          url: '#',
        },
        {
          title: 'هنگ‌کنگ چارچوب جدید صدور مجوز برای صرافی‌های رمزارزی اعلام کرد',
          summary: 'کمیسیون اوراق بهادار و آتی هنگ‌کنگ رژیم جامع صدور مجوز برای پلتفرم‌های معاملاتی دارایی‌های مجازی را رونمایی کرد و این شهر را به قطب پیشرو رمزارز در آسیا تبدیل می‌کند.',
          category: 'regulation',
          source: 'ساوت چاینا مورنینگ پست',
          timestamp: Date.now() - 1000 * 60 * 300,
          trending: false,
          url: '#',
        },
        {
          title: 'سولانا با رشد ۲۵٪ هفتگی از سایر ارزهای بزرگ پیشی گرفت',
          summary: 'سولانا این هفته به عنوان بهترین ارز دیجیتال بزرگ از نظر عملکرد ظاهر شده که ناشی از رشد اکوسیستم و افزایش معاملات میم‌کوین در این شبکه است.',
          category: 'general',
          source: 'کویین‌تلگراف',
          timestamp: Date.now() - 1000 * 60 * 420,
          trending: false,
          url: '#',
        },
      ];

      console.log(`📝 ${initialNews.length} خبر برای درج آماده شده است.`);

      // درج با insert (دسته‌جمعی)
      const insertResult = await this.newsRepository.insert(initialNews as any[]);
      console.log('✅ نتیجه insert:', insertResult);

      const newCount = await this.newsRepository.count();
      console.log(`✅ Seed با موفقیت انجام شد. ${newCount} خبر درج شد.`);

      return { success: true, message: `Seed موفق. ${newCount} خبر درج شد.`, count: newCount };
    } catch (error) {
      const errorMsg = this.getErrorMessage(error);
      console.error('❌ خطا در Seed:', errorMsg);
      // خطا را دوباره پرتاب می‌کنیم تا در پاسخ API نمایش داده شود
      throw new Error(`Seed failed: ${errorMsg}`);
    }
  }

  // ====== شمارش رکوردها ======
 async getCount(): Promise<number> {
  return this.newsRepository.count();
}

  // ==================== متدهای CRUD ====================

  async create(createNewsDto: CreateNewsDto): Promise<newsCrypto> {
    const news = this.newsRepository.create(createNewsDto);
    return this.newsRepository.save(news);
  }

  async findAll(query: GetNewsDto): Promise<{
    data: newsCrypto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, category, trending } = query;
    const skip = (page - 1) * limit;
    const where: any = {};
    if (category) where.category = category;
    if (trending !== undefined) where.trending = trending;

    const [data, total] = await this.newsRepository.findAndCount({
      where,
      order: { timestamp: 'DESC' } as any,
      skip,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<newsCrypto> {
    const news = await this.newsRepository.findOneBy({ id });
    if (!news) {
      throw new NotFoundException(`خبر با شناسه ${id} یافت نشد`);
    }
    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<newsCrypto> {
    const news = await this.findOne(id);
    Object.assign(news, updateNewsDto);
    return this.newsRepository.save(news);
  }

  async remove(id: number): Promise<{ message: string; data: newsCrypto }> {
    const news = await this.findOne(id);
    await this.newsRepository.remove(news);
    return {
      message: 'خبر با موفقیت حذف شد',
      data: news,
    };
  }

  async findTrending(limit: number = 5): Promise<newsCrypto[]> {
    return this.newsRepository.find({
      where: { trending: true },
      order: { timestamp: 'DESC' } as any,
      take: limit,
    });
  }
  
}