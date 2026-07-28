import { Module } from '@nestjs/common';
import { ChartAlertController } from './chart-alert.controller';
import { ChartAlertService } from './chart-alert.service';

@Module({
  controllers: [ChartAlertController],
  providers: [ChartAlertService],
})
export class ChartAlertModule {}