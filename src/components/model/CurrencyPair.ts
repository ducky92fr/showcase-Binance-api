export type BinanceSymbol = {
  symbol: string;
  status: string;
  baseAsset: string;
  quoteAsset: string;
};

export class CurrencyPair {
  symbol: string;
  status: string;
  baseAsset: string;
  quoteAsset: string;

  constructor(props: BinanceSymbol) {
    this.symbol = props.symbol;
    this.status = props.status;
    this.baseAsset = props.baseAsset;
    this.quoteAsset = props.quoteAsset;
  }

  formattedValue() {
    return {
      label: this.baseAsset + "/" + this.quoteAsset,
      value: this.symbol,
    };
  }
}
