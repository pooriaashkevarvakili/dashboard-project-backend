import { Module } from '@nestjs/common';
import { CalendarCryptoService } from './calendar-crypto.service';
import { CalendarCryptoController } from './calendar-crypto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {CalendarCrypto} from './entities/calendar-crypto.entity'
@Module({
  imports:[TypeOrmModule.forFeature([CalendarCrypto])],
  controllers: [CalendarCryptoController],
  providers: [CalendarCryptoService],
})
export class CalendarCryptoModule {}
