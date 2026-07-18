import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCalendarCryptoDto } from './dto/create-calendar-crypto.dto';
import { UpdateCalendarCryptoDto } from './dto/update-calendar-crypto.dto';
import {CalendarCrypto} from './entities/calendar-crypto.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CalendarCryptoService {
  constructor(
    @InjectRepository(CalendarCrypto)
    private readonly calendarRepository: Repository<CalendarCrypto>,
  ) {}


 async create(dto: CreateCalendarCryptoDto) {
  const note = this.calendarRepository.create({
    title: dto.title,
    description: dto.description,
    type: dto.type,
    eventDate: dto.eventDate,
  });

  const result = await this.calendarRepository.save(note);

  return {
    success: true,
    data: {
      ...result,
      eventDate: result.eventDate,
      createdAt: result.createdAt.toISOString().split('T')[0],
    },
  };
}

 

  update(id: number, updateCalendarCryptoDto: UpdateCalendarCryptoDto) {
    return `This action updates a #${id} calendarCrypto`;
  }


    async findAll() {
    const data = await this.calendarRepository.find({
      order: {
        eventDate: 'ASC',
      },
    });

    return {
      success: true,
      data: data.map((item) => ({
        ...item,
        eventDate: item.eventDate,
        createdAt: item.createdAt.toISOString().split('T')[0],
      })),
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
        ...result,
        eventDate: result.eventDate,
        createdAt: result.createdAt.toISOString().split('T')[0],
      },
    };
  }
  remove(id: number) {
    return `This action removes a #${id} calendarCrypto`;
  }
}
