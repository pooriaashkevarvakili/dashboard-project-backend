import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CryptoNewsService } from './news-crypto.service';
import { CryptoNewsEntity } from './entities/news-crypto.entity';
import { CreateCryptoNewsDto } from './dto/create-news-crypto.dto';
import { UpdateCryptoNewsDto } from './dto/update-news-crypto.dto';

@ApiTags('اخبار رمزارز')
@Controller('crypto-news')
export class CryptoNewsController {
  constructor(private readonly newsService: CryptoNewsService) {}

  // دریافت همه اخبار (با فیلترهای اختیاری)
  @Get()
  @ApiOperation({ summary: 'دریافت اخبار با قابلیت فیلتر' })
  @ApiQuery({ name: 'category', required: false, description: 'دسته‌بندی' })
  @ApiQuery({ name: 'source', required: false, description: 'منبع' })
  @ApiQuery({ name: 'trending', required: false, description: 'فقط داغ‌ها', type: Boolean })
  @ApiResponse({ status: 200, description: 'لیست اخبار', type: [CryptoNewsEntity] })
  async findAll(
    @Query('category') category?: string,
    @Query('source') source?: string,
    @Query('trending', new ParseBoolPipe({ optional: true })) trending?: boolean,
  ): Promise<CryptoNewsEntity[]> {
    return this.newsService.filter(category, source, trending);
  }

  @Get('get')
  @ApiOperation({ summary: 'دریافت یک خبر با شناسه (از طریق Query)' })
  @ApiQuery({ name: 'id', required: true, type: Number })
  @ApiResponse({ status: 200, description: 'خبر مورد نظر', type: CryptoNewsEntity })
  @ApiResponse({ status: 404, description: 'خبر یافت نشد' })
  async findOneById(
    @Query('id', new ParseIntPipe()) id: number,
  ): Promise<CryptoNewsEntity> {
    return this.newsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'ایجاد خبر جدید' })
  @ApiResponse({ status: 201, description: 'خبر ایجاد شد', type: CryptoNewsEntity })
  async create(@Body() createDto: CreateCryptoNewsDto): Promise<CryptoNewsEntity> {
    return this.newsService.create(createDto);
  }

  // بروزرسانی خبر
  @Patch(':id')
  @ApiOperation({ summary: 'بروزرسانی خبر' })
  @ApiResponse({ status: 200, description: 'خبر بروزرسانی شد', type: CryptoNewsEntity })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDto: UpdateCryptoNewsDto,
  ): Promise<CryptoNewsEntity> {
    return this.newsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف خبر' })
  @ApiResponse({ status: 200, description: 'خبر حذف شد' })
  async remove(@Param('id', new ParseIntPipe()) id: number): Promise<{ message: string }> {
    return this.newsService.remove(id);
  }
}