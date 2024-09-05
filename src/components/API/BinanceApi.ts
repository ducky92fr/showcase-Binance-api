import { BinanceSymbol, CurrencyPair } from "../model/CurrencyPair";
import { DataMarketTicker24h, Ticker24hData } from "../model/DataMarket24h";
import { DataMarketTicker, TickerData } from "../model/DataMarketTicker";
import { DataRecentTrade, RecentTradeData } from "../model/DataRecentTrade";

const BASE_URL_BINANCE_API = "https://api.binance.com/api/v3";
const EXCHANGE_INFO = "/exchangeInfo";
const TICKER_DATA = "/ticker";
const TICKER_DATA_24h = "/ticker/24hr";
const RECENT_TRADE = "/trades";

export class BinanceApi {
  private baseUrl: string;
  constructor(baseUrl: string = BASE_URL_BINANCE_API) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(
    endpoint: string,
    queryParams?: Record<string, string>
  ): Promise<T> {
    const queryStr = new URLSearchParams(queryParams).toString();
    const url = `${this.baseUrl}${endpoint}${queryStr ? `?${queryStr}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  public async fetchSymbols(): Promise<CurrencyPair[]> {
    const data: { symbols: BinanceSymbol[] } = await this.fetch(EXCHANGE_INFO);
    return data.symbols.map((symbol) => new CurrencyPair(symbol));
  }

  public async fetchTicker(symbol: string): Promise<DataMarketTicker> {
    const data: TickerData = await this.fetch(TICKER_DATA, { symbol });
    return new DataMarketTicker(data);
  }

  public async fetchTicker24h(symbol: string): Promise<DataMarketTicker24h> {
    const data: Ticker24hData = await this.fetch(TICKER_DATA_24h, { symbol });
    return new DataMarketTicker24h(data);
  }

  public async fetchRecentTrades(
    symbol: string,
    limit: number = 500
  ): Promise<DataRecentTrade[]> {
    const data: RecentTradeData[] = await this.fetch(RECENT_TRADE, {
      symbol,
      limit: limit.toString(),
    });

    return data.map((trade) => new DataRecentTrade(trade));
  }
}
