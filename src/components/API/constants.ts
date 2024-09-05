import { BinanceSymbol } from "../model/CurrencyPair";
import { Ticker24hData } from "../model/DataMarket24h";
import { TickerData } from "../model/DataMarketTicker";
import { RecentTradeData } from "../model/DataRecentTrade";

export const mockTicker24hResponse: Ticker24hData = {
  symbol: "BTCUSDT",
  priceChange: "267.15000000",
  priceChangePercent: "0.473",
  weightedAvgPrice: "57389.85213192",
  prevClosePrice: "56526.68000000",
  lastPrice: "56793.83000000",
  lastQty: "0.00089000",
  bidPrice: "56793.83000000",
  bidQty: "5.07870000",
  askPrice: "56793.84000000",
  askQty: "0.53413000",
  openPrice: "56526.68000000",
  highPrice: "58519.00000000",
  lowPrice: "56187.61000000",
  volume: "28085.04930000",
  quoteVolume: "1611796826.44473680",
  openTime: 1725444696316,
  closeTime: 1725531096316,
  firstId: 3787251922,
  lastId: 3790254307,
  count: 3002386,
};

export const mockTickerResponse: TickerData = {
  symbol: "BTCUSDT",
  priceChange: "207.55000000",
  priceChangePercent: "0.367",
  weightedAvgPrice: "57390.12546287",
  openPrice: "56618.76000000",
  highPrice: "58519.00000000",
  lowPrice: "56187.61000000",
  lastPrice: "56826.31000000",
  volume: "28057.67141000",
  quoteVolume: "1610233282.41601800",
  openTime: 1725444240000,
  closeTime: 1725530697392,
  firstId: 3787243053,
  lastId: 3790239612,
  count: 2996560,
};

export const mockBinanceSymbols: { symbols: BinanceSymbol[] } = {
  symbols: [
    {
      symbol: "BTCUSDT",
      status: "Active",
      quoteAsset: "USDT",
      baseAsset: "BTC",
    },
  ],
};

export const mockRecentTradesResponse: RecentTradeData[] = [
  {
    id: 1,
    price: "100.00",
    qty: "0.1",
    quoteQty: "10.00",
    time: 1633052800,
    isBuyerMaker: true,
    isBestMatch: true,
  },
  {
    id: 2,
    price: "101.00",
    qty: "0.2",
    quoteQty: "20.00",
    time: 1633052900,
    isBuyerMaker: false,
    isBestMatch: true,
  },
];
