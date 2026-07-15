import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { GetNewsDto } from './dto/get-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { newsCrypto } from './entities/news.entity'; // ✅ اضافه کردن import Entity

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll(@Query() query: GetNewsDto) {
    return this.newsService.findAll(query);
  }

  @Get('count')
  async count() {
    const count = await this.newsService.getCount();
    return { count };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }

  // ========== Force Seed با لاگ کامل ==========
  @Post('force-seed')
  async forceSeed() {
    try {
      console.log('🚀 Force seed started...');

      // ۷ خبر کامل
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

      console.log(`📝 ${initialNews.length} خبر آماده درج است.`);

      // دسترسی به repository
      const repository = (this.newsService as any).newsRepository;
      if (!repository) {
        throw new Error('newsRepository در دسترس نیست!');
      }

      // درج داده‌ها یکی‌یکی
      const results: newsCrypto[] = []; // ✅ نوع‌دهی صریح با Entity

      for (let i = 0; i < initialNews.length; i++) {
        const news = initialNews[i];
        console.log(`🔄 در حال درج خبر ${i + 1}:`, news.title);
        try {
          const entity = repository.create(news);
          const saved = await repository.save(entity);
          results.push(saved);
          console.log(`✅ خبر ${i + 1} با id ${saved.id} ذخیره شد.`);
        } catch (singleError) {
          console.error(`❌ خطا در خبر ${i + 1}:`, singleError);
          // ادامه بده تا بقیه خبر‌ها هم درج شوند
        }
      }

      // بررسی نهایی
      const finalCount = await repository.count();
      console.log(`📊 تعداد نهایی رکوردها: ${finalCount}`);

      return {
        message: `${results.length} خبر با موفقیت درج شد.`,
        totalInDatabase: finalCount,
        data: results,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('❌ خطای کلی در force-seed:', errorMessage);
      return {
        message: 'خطا در درج داده‌ها',
        error: errorMessage,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Post('seed')
  async seed() {
    await this.newsService.seedInitialData();
    return {
      message: 'Seed executed successfully',
      timestamp: new Date().toISOString(),
    };
  }
}