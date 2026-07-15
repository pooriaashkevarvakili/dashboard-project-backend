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

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // ========== ایجاد خبر جدید ==========
  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  // ========== دریافت لیست اخبار با فیلتر و صفحه‌بندی ==========
  @Get()
  findAll(@Query() query: GetNewsDto) {
    return this.newsService.findAll(query);
  }

  // ========== دریافت یک خبر با شناسه ==========
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }

  // ========== به‌روزرسانی خبر ==========
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    return this.newsService.update(id, updateNewsDto);
  }

  // ========== حذف خبر ==========
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }

  // ========== (جدید) پر کردن دستی دیتابیس با داده‌های نمونه ==========
  @Post('seed')
  async seed() {
    await this.newsService.seedInitialData();
    return {
      message: 'Seed executed successfully',
      timestamp: new Date().toISOString(),
    };
  }
}