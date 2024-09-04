export type RecentTradeData = {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: string;
  isBuyerMaker: string;
  isBestMatch: string;
};

export class DataRecentTrade {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: string;
  isBuyerMaker: string;
  isBestMatch: string;

  constructor(props: RecentTradeData) {
    this.id = props.id;
    this.price = props.price;
    this.qty = props.qty;
    this.quoteQty = props.quoteQty;
    this.time = props.time;
    this.isBuyerMaker = props.isBuyerMaker;
    this.isBestMatch = props.isBestMatch;
  }

  formattedValue() {
    return {
      id: this.id,
      time: new Date(this.time).toLocaleString(),
      price: Number(this.price),
      quantity: Number(this.qty),
      "quote quantity": Number(this.quoteQty),
    };
  }
}
