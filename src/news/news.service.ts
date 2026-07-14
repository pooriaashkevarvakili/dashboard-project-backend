import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewsEntity } from './entities/news.entity';
import { GetNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async create(createNewsDto: GetNewsDto) {
    const news = this.newsRepository.create(createNewsDto);
    return await this.newsRepository.save(news);
  }

  async findAll(query: GetNewsDto) {
  const { category, search, trending, page, limit } = query;

  const qb = this.newsRepository.createQueryBuilder('news');

  if (category) {
    qb.andWhere('news.category = :category', { category });
  }

  if (search) {
    qb.andWhere(
      '(news.title ILIKE :search OR news.summary ILIKE :search)',
      { search: `%${search}%` },
    );
  }

  if (trending !== undefined) {
    qb.andWhere('news.trending = :trending', { trending });
  }

  qb.orderBy('news.createdAt', 'DESC');

  qb.skip((page - 1) * limit);
  qb.take(limit);

  const [items, total] = await qb.getManyAndCount();

  return {
    data: items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

  async findOne(id: string) {
    const news = await this.newsRepository.findOne({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException('News not found');
    }

    return news;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    const news = await this.findOne(id);

    Object.assign(news, updateNewsDto);

    return await this.newsRepository.save(news);
  }

  async remove(id: string) {
    const news = await this.findOne(id);

    await this.newsRepository.remove(news);

    return {
      message: 'News deleted successfully',
    };
  }
}