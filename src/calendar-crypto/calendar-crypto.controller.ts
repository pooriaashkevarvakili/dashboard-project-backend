import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalendarCryptoService } from './calendar-crypto.service';
import { CreateCalendarCryptoDto } from './dto/create-calendar-crypto.dto';
import { UpdateCalendarCryptoDto } from './dto/update-calendar-crypto.dto';
import { ApiResponse,ApiOperation } from '@nestjs/swagger';
import {CalendarCrypto} from './entities/calendar-crypto.entity'
@Controller('calendar-crypto')
export class CalendarCryptoController {
  constructor(private readonly calendarCryptoService: CalendarCryptoService) {}
@ApiOperation({ summary: 'کلندر جدید اضافه شد' })
  @ApiResponse({ status: 200, description: 'کلندر جدید اضافه شد', type: CalendarCrypto })
  @ApiResponse({ status: 404, description: 'کلندر جدید یافت نشد' })

  @Post()
   create(@Body() body: CreateCalendarCryptoDto) {
     return this.calendarCryptoService.create(body);
   }

  @Get()
  findAll() {
    return this.calendarCryptoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarCryptoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalendarCryptoDto: UpdateCalendarCryptoDto) {
    return this.calendarCryptoService.update(+id, updateCalendarCryptoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarCryptoService.remove(+id);
  }
}
