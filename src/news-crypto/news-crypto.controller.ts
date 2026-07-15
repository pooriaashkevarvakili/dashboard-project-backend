import { Controller, Get, Query, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CryptoNewsService } from './news-crypto.service';
import { CryptoNewsEntity } from './entities/news-crypto.entity';

@ApiTags('اخبار رمزارز')
@Controller('crypto-news')
export class CryptoNewsController {
  constructor(private readonly newsService: CryptoNewsService) {}

  // ---------- دریافت همه اخبار ----------
  @Get()
  @ApiOperation({ summary: 'دریافت همه اخبار رمزارز' })
  @ApiResponse({ status: 200, description: 'لیست تمام اخبار', type: [CryptoNewsEntity] })
  async findAll(): Promise<CryptoNewsEntity[]> {
    return this.newsService.findAll();
  }

  // ---------- دریافت خبر با شناسه (از طریق Query) ----------
  @Get('get')
  @ApiOperation({ summary: 'دریافت یک خبر با شناسه (از طریق Query Parameter)' })
  @ApiQuery({ name: 'id', required: true, type: Number, description: 'شناسه خبر' })
  @ApiResponse({ status: 200, description: 'خبر مورد نظر', type: CryptoNewsEntity })
  @ApiResponse({ status: 404, description: 'خبر با شناسه مورد نظر یافت نشد' })
  async findOneById(
    @Query('id', new ParseIntPipe({ optional: false })) id: number,
  ): Promise<CryptoNewsEntity> {
    return this.newsService.findOne(id);
  }

  // ---------- (اختیاری) درج دستی داده‌های اولیه برای دیباگ ----------
  @Post('seed')
  @ApiOperation({ summary: 'درج داده‌های اولیه (در صورت خالی بودن جدول)' })
  async seedDatabase() {
    await this.newsService.seed();
    return { message: 'عملیات Seed با موفقیت انجام شد.' };
  }
}