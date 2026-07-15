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

  async create(createNewsDto: CreateNewsDto): Promise<NewsEntity> {
    const news = this.newsRepository.create(createNewsDto);
    return this.newsRepository.save(news);
  }

  async findAll(query: GetNewsDto): Promise<{
    data: NewsEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, category, trending } = query;

    const skip = (page - 1) * limit;

    // ساخت شرط‌های جستجو
    const where: any = {};
    if (category) where.category = category;
    if (trending !== undefined) where.trending = trending;

    // دریافت داده‌ها و تعداد کل
    const [data, total] = await this.newsRepository.findAndCount({
      where,
      order: { timestamp: 'DESC' } as any, // ✅ رفع خطای TypeScript
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

  async findOne(id: number): Promise<NewsEntity> {
    const news = await this.newsRepository.findOneBy({ id });
    if (!news) {
      throw new NotFoundException(`خبر با شناسه ${id} یافت نشد`);
    }
    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<NewsEntity> {
    const news = await this.findOne(id);
    Object.assign(news, updateNewsDto);
    return this.newsRepository.save(news);
  }

  async remove(id: number): Promise<{ message: string; data: NewsEntity }> {
    const news = await this.findOne(id);
    await this.newsRepository.remove(news);
    return {
      message: 'خبر با موفقیت حذف شد',
      data: news,
    };
  }

  async findTrending(limit: number = 5): Promise<NewsEntity[]> {
    return this.newsRepository.find({
      where: { trending: true },
      order: { timestamp: 'DESC' } as any, // ✅ رفع خطای TypeScript
      take: limit,
    });
  }
}