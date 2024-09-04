type TickerData = {
  closeTime: number;
  count: number;
  firstId: number;
  highPrice: string;
  lastId: number;
  lastPrice: string;
  lowPrice: string;
  openPrice: string;
  openTime: number;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  symbol: string;
  volume: string;
  weightedAvgPrice: string;
};

export class DataMarketTicker {
  symbol: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
  highPrice: string;
  lastPrice: string;
  lowPrice: string;
  openPrice: string;
  priceChange: string;
  priceChangePercent: string;
  quoteVolume: string;
  volume: string;
  weightedAvgPrice: string;

  constructor(tickerData: TickerData) {
    this.symbol = tickerData.symbol;
    this.priceChange = tickerData.priceChange;
    this.priceChangePercent = tickerData.priceChangePercent;
    this.openTime = tickerData.openTime;
    this.closeTime = tickerData.closeTime;
    this.firstId = tickerData.firstId;
    this.lastId = tickerData.lastId;
    this.count = tickerData.count;
    this.highPrice = tickerData.highPrice;
    this.lastPrice = tickerData.lastPrice;
    this.lowPrice = tickerData.lowPrice;
    this.openPrice = tickerData.openPrice;
    this.quoteVolume = tickerData.quoteVolume;
    this.volume = tickerData.volume;
    this.weightedAvgPrice = tickerData.weightedAvgPrice;
  }

  formattedValue() {
    return [
      { label: "Symbol", value: this.symbol },
      { label: "Price Change", value: Number(this.priceChange) },
      { label: "Price Change Percent", value: Number(this.priceChangePercent) },
      { label: "Last Price", value: Number(this.lastPrice) },
      { label: "Weighted Avg Price", value: Number(this.weightedAvgPrice) },
      { label: "Open Price", value: Number(this.openPrice) },
      { label: "High Price", value: Number(this.highPrice) },
      { label: "Low Price", value: Number(this.lowPrice) },
      { label: "Volumn", value: Number(this.volume) },
      { label: "Quote Volumn", value: Number(this.quoteVolume) },
      { label: "Open Time", value: new Date(this.openTime).toLocaleString() },
      { label: "Close Time", value: new Date(this.closeTime).toLocaleString() },
      { label: "Count", value: Number(this.count) },
    ];
  }
}
