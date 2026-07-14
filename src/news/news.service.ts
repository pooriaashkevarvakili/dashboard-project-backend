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
      title: 'بیت‌کوین از مرز ۷۲,۰۰۰ دلار عبور کرد؛ ورود نهادی‌ها به اوج رسید',
      summary:
        'بیت‌کوین با شکستن مقاومت ۷۲,۰۰۰ دلاری، تحت تأثیر ورود سرمایه نهادی رشد کرد.',
      category: 'bitcoin',
      source: 'کویندسک',
      url: '#',
      trending: true,
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'افزایش بی‌سابقه فعالیت در لایه۲ اتریوم',
      summary:
        'شبکه‌های لایه۲ اتریوم رکورد جدید ثبت کردند.',
      category: 'ethereum',
      source: 'بلاک',
      url: '#',
      trending: true,
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'قوانین جدید رمزارز توسط SEC',
      summary:
        'قوانین جدید برای دارایی دیجیتال تصویب شد.',
      category: 'regulation',
      source: 'بلومبرگ',
      url: '#',
      trending: false,
      createdAt: new Date(),
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