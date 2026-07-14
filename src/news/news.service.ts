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
  console.log('NewsService.findAll called');

  const { category, search, trending, page = 1, limit = 10 } = query;

  const qb = this.newsRepository.createQueryBuilder('news');

  // ...

  const [items, total] = await qb.getManyAndCount();

  return {
    data: items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
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