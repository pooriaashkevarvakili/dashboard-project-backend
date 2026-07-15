import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoNewsEntity } from './entities/news-crypto.entity';
import { CreateCryptoNewsDto } from './dto/create-news-crypto.dto';
import { UpdateCryptoNewsDto } from './dto/update-news-crypto.dto';

@Injectable()
export class CryptoNewsService {
  private readonly logger = new Logger(CryptoNewsService.name);

  constructor(
    @InjectRepository(CryptoNewsEntity)
    private readonly newsRepository: Repository<CryptoNewsEntity>,
  ) {}

  // دریافت همه اخبار
  async findAll(): Promise<CryptoNewsEntity[]> {
    return this.newsRepository.find();
  }

  // دریافت یک خبر با شناسه
  async findOne(id: number): Promise<CryptoNewsEntity> {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException(`خبر با شناسه ${id} یافت نشد`);
    }
    return news;
  }

  // ایجاد خبر جدید
  async create(createDto: CreateCryptoNewsDto): Promise<CryptoNewsEntity> {
    const newNews = this.newsRepository.create({
      ...createDto,
      timestamp: createDto.timestamp || Date.now(),
      trending: createDto.trending || false,
      url: createDto.url || '#',
    });
    return this.newsRepository.save(newNews);
  }

  // بروزرسانی خبر
  async update(id: number, updateDto: UpdateCryptoNewsDto): Promise<CryptoNewsEntity> {
    const news = await this.findOne(id);
    Object.assign(news, updateDto);
    return this.newsRepository.save(news);
  }

  // حذف خبر
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.newsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`خبر با شناسه ${id} یافت نشد`);
    }
    return { message: `خبر با شناسه ${id} حذف شد` };
  }

  // ---------- تابع Seed با لاگ ----------
  async seed(): Promise<void> {
    const count = await this.newsRepository.count();
    this.logger.log(`تعداد اخبار موجود: ${count}`);

    if (count > 0) {
      this.logger.log('داده‌ها قبلاً درج شده‌اند، عملیات Seed رد شد.');
      return;
    }

    const seedData: Partial<CryptoNewsEntity>[] = [
      {
        title: 'بیت‌کوین از مرز ۷۲,۰۰۰ دلار عبور کرد؛ ورود نهادی‌ها به اوج رسید',
        summary:
          'بیت‌کوین با شکستن مقاومت ۷۲,۰۰۰ دلاری، تحت تأثیر رکوردشکنی ورود سرمایه‌های نهادی به صندوق‌های ETF و افزایش پذیرش در میان مؤسسات مالی سنتی قرار گرفت.',
        category: 'bitcoin',
        source: 'کویندسک',
        timestamp: Date.now() - 1000 * 60 * 15,
        trending: true,
        url: '#',
      },
      {
        title: 'افزایش بی‌سابقه فعالیت در لایه‌۲ اتریوم؛ آربیتروم و آپتیمیسم رکورد زدند',
        summary:
          'تعداد آدرس‌های فعال روزانه در شبکه‌های لایه‌۲ اتریوم به بالاترین سطح خود رسیده و آربیتروم پیشتاز است. کارمزد تراکنش‌ها همچنان پایین مانده و فعالیت دی‌فای را افزایش داده است.',
        category: 'ethereum',
        source: 'بلاک',
        timestamp: Date.now() - 1000 * 60 * 45,
        trending: true,
        url: '#',
      },
      {
        title: 'تصویب قوانین جدید نگهداری رمزارز توسط SEC؛ گامی بزرگ برای نهادهای مالی',
        summary:
          'کمیسیون بورس و اوراق بهادار آمریکا قوانین نهایی نگهداری از دارایی‌های دیجیتال را تصویب کرد که به عنوان سیگنالی صعودی برای محصولات رمزارزی تحت نظارت تلقی می‌شود.',
        category: 'regulation',
        source: 'بلومبرگ کریپتو',
        timestamp: Date.now() - 1000 * 60 * 120,
        trending: false,
        url: '#',
      },
      {
        title: 'بازار NFT نشانه‌های بهبود را نشان می‌دهد؛ کلکسیون‌های شاخص ۴۰٪ رشد کردند',
        summary:
          'پس از یک بازار نزولی طولانی، فضای NFT با بازگشت علاقه مواجه شده و کلکسیون‌هایی مثل Bored Ape Yacht Club و CryptoPunks رشد دو رقمی ثبت کرده‌اند.',
        category: 'nft',
        source: 'دکریپت',
        timestamp: Date.now() - 1000 * 60 * 180,
        trending: false,
        url: '#',
      },
      {
        title: 'ارزش کل قفل‌شده در پروتکل‌های دی‌فای از ۱۰۰ میلیارد دلار عبور کرد',
        summary:
          'مجموع ارزش قفل‌شده در پروتکل‌های مالی غیرمتمرکز برای اولین بار پس از ۲۰۲۲ از مرز ۱۰۰ میلیارد دلار گذشت که ناشی از بازگشت فرصت‌های سوددهی و مشتقات نقدشوندگی جدید است.',
        category: 'defi',
        source: 'دی‌فای‌لاما',
        timestamp: Date.now() - 1000 * 60 * 240,
        trending: true,
        url: '#',
      },
      {
        title: 'هنگ‌کنگ چارچوب جدید صدور مجوز برای صرافی‌های رمزارزی اعلام کرد',
        summary:
          'کمیسیون اوراق بهادار و آتی هنگ‌کنگ رژیم جامع صدور مجوز برای پلتفرم‌های معاملاتی دارایی‌های مجازی را رونمایی کرد و این شهر را به قطب پیشرو رمزارز در آسیا تبدیل می‌کند.',
        category: 'regulation',
        source: 'ساوت چاینا مورنینگ پست',
        timestamp: Date.now() - 1000 * 60 * 300,
        trending: false,
        url: '#',
      },
      {
        title: 'سولانا با رشد ۲۵٪ هفتگی از سایر ارزهای بزرگ پیشی گرفت',
        summary:
          'سولانا این هفته به عنوان بهترین ارز دیجیتال بزرگ از نظر عملکرد ظاهر شده که ناشی از رشد اکوسیستم و افزایش معاملات میم‌کوین در این شبکه است.',
        category: 'general',
        source: 'کویین‌تلگراف',
        timestamp: Date.now() - 1000 * 60 * 420,
        trending: false,
        url: '#',
      },
    ];

    for (const data of seedData) {
      await this.newsRepository.save(this.newsRepository.create(data));
    }

    this.logger.log(`${seedData.length} خبر با موفقیت در دیتابیس درج شد.`);
  }
}