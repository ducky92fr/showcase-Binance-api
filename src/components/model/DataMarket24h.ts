export type Ticker24hData = {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
};

export class DataMarketTicker24h {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;

  constructor(props: Ticker24hData) {
    this.symbol = props.symbol;
    this.priceChange = props.priceChange;
    this.priceChangePercent = props.priceChangePercent;
    this.openTime = props.openTime;
    this.closeTime = props.closeTime;
    this.firstId = props.firstId;
    this.lastId = props.lastId;
    this.count = props.count;
    this.highPrice = props.highPrice;
    this.lastPrice = props.lastPrice;
    this.lowPrice = props.lowPrice;
    this.openPrice = props.openPrice;
    this.quoteVolume = props.quoteVolume;
    this.volume = props.volume;
    this.weightedAvgPrice = props.weightedAvgPrice;
    this.prevClosePrice = props.prevClosePrice;
    this.lastQty = props.lastQty;
    this.bidPrice = props.bidPrice;
    this.bidQty = props.bidQty;
    this.askPrice = props.askPrice;
    this.askQty = props.askQty;
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
      { label: "Volume", value: Number(this.volume) },
      { label: "Quote Volume", value: Number(this.quoteVolume) },
      { label: "Open Time", value: new Date(this.openTime).toLocaleString() },
      { label: "Close Time", value: new Date(this.closeTime).toLocaleString() },
      { label: "Count", value: Number(this.count) },
      { label: "Prev Close Price", value: Number(this.prevClosePrice) },
      { label: "Last Quantity", value: Number(this.lastQty) },
      { label: "Bid Price", value: Number(this.bidPrice) },
      { label: "Bid Quantity", value: Number(this.bidQty) },
      { label: "Ask Price", value: Number(this.askPrice) },
      { label: "Ask Quantity", value: Number(this.askQty) },
    ];
  }
}
