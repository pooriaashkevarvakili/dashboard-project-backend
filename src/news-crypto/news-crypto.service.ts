import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CryptoNewsEntity } from './entities/news-crypto.entity';
import { CreateCryptoNewsDto } from './dto/create-news-crypto.dto';
import { UpdateCryptoNewsDto } from './dto/update-news-crypto.dto';

@Injectable()
export class CryptoNewsService {
  constructor(
    @InjectRepository(CryptoNewsEntity)
    private readonly newsRepository: Repository<CryptoNewsEntity>,
  ) {}

  // دریافت همه اخبار (اگر خالی باشد، [] برمی‌گرداند - بدون خطا)
  async findAll(): Promise<CryptoNewsEntity[]> {
    return this.newsRepository.find();
  }

  // دریافت یک خبر با شناسه (اگر نبود، خطای ۴۰۴)
  async findOne(id: number): Promise<CryptoNewsEntity> {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException(`خبر با شناسه ${id} یافت نشد`);
    }
    return news;
  }

  // فیلتر اخبار بر اساس پارامترها (همه اختیاری)
  async filter(
    category?: string,
    source?: string,
    trending?: boolean,
  ): Promise<CryptoNewsEntity[]> {
    const where: FindOptionsWhere<CryptoNewsEntity> = {};

    if (category) where.category = category;
    if (source) where.source = source;
    if (trending !== undefined && trending !== null) where.trending = trending;

    if (Object.keys(where).length === 0) {
      return this.findAll();
    }

    return this.newsRepository.find({ where });
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
}