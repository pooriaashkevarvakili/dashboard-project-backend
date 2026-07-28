import { ChartPoint } from "./chart.types";

const btcData: ChartPoint[] = [
  { x: "2025-01-01", y: 43200 },
  { x: "2025-01-02", y: 43850 },
  { x: "2025-01-03", y: 44100 },
  { x: "2025-01-04", y: 44720 },
  { x: "2025-01-05", y: 44500 },
  { x: "2025-01-06", y: 45200 },
  { x: "2025-01-07", y: 45850 },
  { x: "2025-01-08", y: 46100 },
  { x: "2025-01-09", y: 45650 },
  { x: "2025-01-10", y: 46300 },
];

const ethData: ChartPoint[] = [
  { x: "2025-01-01", y: 2950 },
  { x: "2025-01-02", y: 2985 },
  { x: "2025-01-03", y: 3010 },
  { x: "2025-01-04", y: 3045 },
  { x: "2025-01-05", y: 3020 },
  { x: "2025-01-06", y: 3070 },
  { x: "2025-01-07", y: 3105 },
  { x: "2025-01-08", y: 3130 },
  { x: "2025-01-09", y: 3110 },
  { x: "2025-01-10", y: 3155 },
];

export const generateSampleData = (symbol: string): ChartPoint[] => {
  switch (symbol.toUpperCase()) {
    case "BTC":
      return btcData;

    case "ETH":
      return ethData;

    default:
      return btcData;
  }
};