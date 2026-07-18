import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CalendarCrypto } from './entities/calendar-crypto.entity';
import { CreateCalendarCryptoDto } from './dto/create-calendar-crypto.dto';
import { UpdateCalendarCryptoDto } from './dto/update-calendar-crypto.dto';

@Injectable()
export class CalendarCryptoService {
  constructor(
    @InjectRepository(CalendarCrypto)
    private readonly calendarRepository: Repository<CalendarCrypto>,
  ) {}

  async create(dto: CreateCalendarCryptoDto) {
    const event = this.calendarRepository.create(dto);
    await this.calendarRepository.save(event);

    return this.findAll();
  }

  async findAll() {
    const events = await this.calendarRepository.find({
      order: {
        eventDate: 'ASC',
      },
    });

    return {
      success: true,
      data: this.groupEventsByDate(events),
    };
  }

  async findOne(id: number) {
    const result = await this.calendarRepository.findOne({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException('رکورد یافت نشد');
    }

    return {
      success: true,
      data: {
        id: result.id,
        title: result.title,
        description: result.description,
        eventDate:
          result.eventDate instanceof Date
            ? result.eventDate.toISOString().split('T')[0]
            : result.eventDate,
        type: result.type,
      },
    };
  }

  update(id: number, dto: UpdateCalendarCryptoDto) {
    return `This action updates a #${id} calendarCrypto`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendarCrypto`;
  }

  private groupEventsByDate(events: CalendarCrypto[]) {
    return events.reduce((acc, item) => {
      const date =
        item.eventDate instanceof Date
          ? item.eventDate.toISOString().split('T')[0]
          : item.eventDate;

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push({
        id: item.id,
        title: item.title,
        description: item.description,
        type: item.type,
      });

      return acc;
    }, {} as Record<string, any[]>);
  }
}