import { Injectable } from '@nestjs/common';
import { generateSampleData } from "./sample-data";

@Injectable()
export class ChartAlertService {
     getChart(symbol: string) {
    return generateSampleData(symbol);
  }

  getSymbols() {
    return ["BTC", "ETH"];
  }
}
