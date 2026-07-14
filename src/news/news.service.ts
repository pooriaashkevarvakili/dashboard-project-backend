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

  private newsData = [

  {
    id: 1,
    title: "بیت‌کوین از مرز ۷۲,۰۰۰ دلار عبور کرد؛ ورود نهادی‌ها به اوج رسید",
    summary:
      "بیت‌کوین با شکستن مقاومت ۷۲,۰۰۰ دلاری، تحت تأثیر رکوردشکنی ورود سرمایه‌های نهادی به صندوق‌های ETF و افزایش پذیرش در میان مؤسسات مالی سنتی قرار گرفت.",
    category: "bitcoin",
    source: "کویندسک",
    timestamp: Date.now() - 1000 * 60 * 15,
    trending: true,
    url: "#",
  },
  {
    id: 2,
    title: "افزایش بی‌سابقه فعالیت در لایه‌۲ اتریوم؛ آربیتروم و آپتیمیسم رکورد زدند",
    summary:
      "تعداد آدرس‌های فعال روزانه در شبکه‌های لایه‌۲ اتریوم به بالاترین سطح خود رسیده و آربیتروم پیشتاز است. کارمزد تراکنش‌ها همچنان پایین مانده و فعالیت دی‌فای را افزایش داده است.",
    category: "ethereum",
    source: "بلاک",
    timestamp: Date.now() - 1000 * 60 * 45,
    trending: true,
    url: "#",
  },
  {
    id: 3,
    title: "تصویب قوانین جدید نگهداری رمزارز توسط SEC؛ گامی بزرگ برای نهادهای مالی",
    summary:
      "کمیسیون بورس و اوراق بهادار آمریکا قوانین نهایی نگهداری از دارایی‌های دیجیتال را تصویب کرد که به عنوان سیگنالی صعودی برای محصولات رمزارزی تحت نظارت تلقی می‌شود.",
    category: "regulation",
    source: "بلومبرگ کریپتو",
    timestamp: Date.now() - 1000 * 60 * 120,
    trending: false,
    url: "#",
  },
  {
    id: 4,
    title: "بازار NFT نشانه‌های بهبود را نشان می‌دهد؛ کلکسیون‌های شاخص ۴۰٪ رشد کردند",
    summary:
      "پس از یک بازار نزولی طولانی، فضای NFT با بازگشت علاقه مواجه شده و کلکسیون‌هایی مثل Bored Ape Yacht Club و CryptoPunks رشد دو رقمی ثبت کرده‌اند.",
    category: "nft",
    source: "دکریپت",
    timestamp: Date.now() - 1000 * 60 * 180,
    trending: false,
    url: "#",
  },
  {
    id: 5,
    title: "ارزش کل قفل‌شده در پروتکل‌های دی‌فای از ۱۰۰ میلیارد دلار عبور کرد",
    summary:
      "مجموع ارزش قفل‌شده در پروتکل‌های مالی غیرمتمرکز برای اولین بار پس از ۲۰۲۲ از مرز ۱۰۰ میلیارد دلار گذشت که ناشی از بازگشت فرصت‌های سوددهی و مشتقات نقدشوندگی جدید است.",
    category: "defi",
    source: "دی‌فای‌لاما",
    timestamp: Date.now() - 1000 * 60 * 240,
    trending: true,
    url: "#",
  },
  {
    id: 6,
    title: "هنگ‌کنگ چارچوب جدید صدور مجوز برای صرافی‌های رمزارزی اعلام کرد",
    summary:
      "کمیسیون اوراق بهادار و آتی هنگ‌کنگ رژیم جامع صدور مجوز برای پلتفرم‌های معاملاتی دارایی‌های مجازی را رونمایی کرد و این شهر را به قطب پیشرو رمزارز در آسیا تبدیل می‌کند.",
    category: "regulation",
    source: "ساوت چاینا مورنینگ پست",
    timestamp: Date.now() - 1000 * 60 * 300,
    trending: false,
    url: "#",
  },
  {
    id: 7,
    title: "سولانا با رشد ۲۵٪ هفتگی از سایر ارزهای بزرگ پیشی گرفت",
    summary:
      "سولانا این هفته به عنوان بهترین ارز دیجیتال بزرگ از نظر عملکرد ظاهر شده که ناشی از رشد اکوسیستم و افزایش معاملات میم‌کوین در این شبکه است.",
    category: "general",
    source: "کویین‌تلگراف",
    timestamp: Date.now() - 1000 * 60 * 420,
    trending: false,
    url: "#",
  },
  ];


  async create(createNewsDto: CreateNewsDto) {
    const news = this.newsRepository.create(createNewsDto);
    return this.newsRepository.save(news);
  }


  async findAll(query: GetNewsDto) {

    return {
      data: this.newsData,
      total: this.newsData.length,
      page: 1,
      limit: this.newsData.length,
      totalPages: 1,
    };
  }


  async findOne(id: number) {

    console.log("REQUEST ID:", id);

    const news = this.newsData.find(
      (item) => item.id === Number(id)
    );


    console.log("FOUND:", news);


    if (!news) {
      throw new NotFoundException(
        `News with id ${id} not found`
      );
    }


    return news;
  }


  async update(id: number, updateNewsDto: UpdateNewsDto) {

    const news = await this.findOne(id);

    Object.assign(news, updateNewsDto);

    return news;
  }


  async remove(id: number) {

    const news = await this.findOne(id);

    return {
      message: 'News deleted successfully',
      data: news,
    };
  }
}