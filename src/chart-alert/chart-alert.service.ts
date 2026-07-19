import { Injectable } from '@nestjs/common';
import { generateSampleData } from "./sample-data";
import { CreateAlertDto } from './dto/create-alert.dto';

@Injectable()
export class ChartAlertService {
      private alerts: CreateAlertDto[] = [];

     getChart(symbol: string) {
    return generateSampleData(symbol);
  }
  getAlerts() {
    return this.alerts;
  }

  createAlert(dto: CreateAlertDto) {
    this.alerts.push(dto);

    return {
      message: 'Alert created successfully',
      data: dto,
    };
  }
  getSymbols() {
    return ["BTC", "ETH"];
  }
}
