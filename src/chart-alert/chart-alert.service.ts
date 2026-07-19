import { Injectable } from '@nestjs/common';
import { generateSampleData } from "./sample-data";
import { CreateAlertDto } from './dto/create-alert.dto';

@Injectable()
export class ChartAlertService {
      private alerts: CreateAlertDto[] = [];

     getChart(symbol: string) {
    return generateSampleData(symbol);
  }
    private getIndicatorIcon(indicator: string) {
    switch (indicator) {
      case 'Price':
        return '💲';
      case 'Volume':
        return '📊';
      case 'RSI':
        return '📉';
      case 'MACD':
        return '📈';
      default:
        return '🔔';
    }
  }

    getAlerts() {
    return this.alerts.map(alert => ({
      ...alert,
      icon: this.getIndicatorIcon(alert.indicator),
    }));
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
