import {
  Controller,
  Get,
  Query,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { TradersService } from './copy-trade.service';
import { QueryTraderDto } from './dto/query-trader.dto';

@Controller('traders')
export class TradersController {
  constructor(private readonly service: TradersService) {}

  // ==============================
  //  دریافت لیست با جستجو و فیلتر
  // ==============================
  @Get()
  getAll(@Query() query: QueryTraderDto) {
    return this.service.getTraders(query);
  }

  // ==============================
  //  دریافت برترین‌ها (برای نمایش در بالای صفحه)
  // ==============================
  @Get('top')
  top(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    return this.service.topPerformers(limit ?? 4);
  }

  // ==============================
  //  کپی کردن تریدر
  // ==============================
  @Post(':id/copy')
  copy(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { amount: number },
  ) {
    return this.service.copyTrader(id, body.amount);
  }

  // ==============================
  //  توقف کپی
  // ==============================
  @Post(':id/stop')
  stop(@Param('id', ParseIntPipe) id: number) {
    return this.service.stopCopying(id);
  }

  // ==============================
  //  تغییر وضعیت ستاره
  // ==============================
  @Post(':id/star')
  star(@Param('id', ParseIntPipe) id: number) {
    return this.service.toggleStar(id);
  }
}