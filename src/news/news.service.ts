import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewsEntity } from './entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { GetNewsDto } from './dto/get-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    const news = this.newsRepository.create(createNewsDto);
    return await this.newsRepository.save(news);
  }

async findAll(query: GetNewsDto) {
  const news = [
    {
      id: 1,
      title: 'بیت‌کوین از مرز ۷۲,۰۰۰ دلار عبور کرد؛ ورود نهادی‌ها به اوج رسید',
      summary:
        'بیت‌کوین با شکستن مقاومت ۷۲,۰۰۰ دلاری، تحت تأثیر رکوردشکنی ورود سرمایه‌های نهادی به صندوق‌های ETF و افزایش پذیرش در میان مؤسسات مالی سنتی قرار گرفت.',
      category: 'bitcoin',
      source: 'کویندسک',
      url: '#',
      trending: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: 2,
      title: 'افزایش بی‌سابقه فعالیت در لایه‌۲ اتریوم؛ آربیتروم و آپتیمیسم رکورد زدند',
      summary:
        'تعداد آدرس‌های فعال روزانه در شبکه‌های لایه‌۲ اتریوم به بالاترین سطح خود رسیده و آربیتروم پیشتاز است.',
      category: 'ethereum',
      source: 'بلاک',
      url: '#',
      trending: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: 3,
      title: 'تصویب قوانین جدید نگهداری رمزارز توسط SEC؛ گامی بزرگ برای نهادهای مالی',
      summary:
        'کمیسیون بورس و اوراق بهادار آمریکا قوانین نهایی نگهداری از دارایی‌های دیجیتال را تصویب کرد.',
      category: 'regulation',
      source: 'بلومبرگ کریپتو',
      url: '#',
      trending: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      id: 4,
      title: 'بازار NFT نشانه‌های بهبود را نشان می‌دهد؛ کلکسیون‌های شاخص ۴۰٪ رشد کردند',
      summary:
        'فضای NFT با بازگشت علاقه مواجه شده و کلکسیون‌های شاخص رشد کرده‌اند.',
      category: 'nft',
      source: 'دکریپت',
      url: '#',
      trending: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 180),
    },
    {
      id: 5,
      title: 'ارزش کل قفل‌شده در پروتکل‌های دی‌فای از ۱۰۰ میلیارد دلار عبور کرد',
      summary:
        'مجموع ارزش قفل‌شده در پروتکل‌های مالی غیرمتمرکز از ۱۰۰ میلیارد دلار عبور کرد.',
      category: 'defi',
      source: 'دی‌فای‌لاما',
      url: '#',
      trending: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 240),
    },
    {
      id: 6,
      title: 'هنگ‌کنگ چارچوب جدید صدور مجوز برای صرافی‌های رمزارزی اعلام کرد',
      summary:
        'هنگ‌کنگ رژیم جامع صدور مجوز برای پلتفرم‌های معاملاتی دارایی‌های مجازی معرفی کرد.',
      category: 'regulation',
      source: 'ساوت چاینا مورنینگ پست',
      url: '#',
      trending: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 300),
    },
    {
      id: 7,
      title: 'سولانا با رشد ۲۵٪ هفتگی از سایر ارزهای بزرگ پیشی گرفت',
      summary:
        'سولانا این هفته بهترین عملکرد را بین ارزهای دیجیتال بزرگ ثبت کرد.',
      category: 'general',
      source: 'کویین‌تلگراف',
      url: '#',
      trending: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 420),
    },
  ];

  return {
    data: news,
    total: news.length,
    page: 1,
    limit: news.length,
    totalPages: 1,
  };
}
async findOne(id: number) {
  console.log('Requested id:', id);

  const all = await this.newsRepository.find();
  console.log('All news:', all);

  const news = await this.newsRepository.findOne({
    where: { id },
  });

  console.log('Found news:', news);

  if (!news) {
    throw new NotFoundException('News not found');
  }

  return news;
}

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const news = await this.findOne(id);

    Object.assign(news, updateNewsDto);

    return await this.newsRepository.save(news);
  }

  async remove(id: number) {
    const news = await this.findOne(id);

    await this.newsRepository.remove(news);

    return {
      message: 'News deleted successfully',
    };
  }
}