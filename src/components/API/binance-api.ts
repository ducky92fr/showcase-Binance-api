import { BinanceSymbol, CurrencyPair } from "../model/CurrencyPair";
import { DataMarketTicker24h, Ticker24hData } from "../model/DataMarket24h";
import { DataMarketTicker, TickerData } from "../model/DataMarketTicker";
import { DataRecentTrade, RecentTradeData } from "../model/DataRecentTrade";

export class BinanceApi {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "https://api.binance.com/api/v3";
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      throw new Error(
        `Error fetching data from ${endpoint}: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  public async fetchSymbols(): Promise<CurrencyPair[]> {
    const data: { symbols: BinanceSymbol[] } =
      await this.fetch("/exchangeInfo");
    return data.symbols.map((symbol) => new CurrencyPair(symbol));
  }

  public async fetchTicker(symbol: string): Promise<DataMarketTicker> {
    const data: TickerData = await this.fetch(`/ticker?symbol=${symbol}`);
    return new DataMarketTicker(data);
  }

  public async fetchTicker24h(symbol: string): Promise<DataMarketTicker24h> {
    const data: Ticker24hData = await this.fetch(
      `/ticker/24hr?symbol=${symbol}`
    );
    return new DataMarketTicker24h(data);
  }

  public async fetchRecentTrades(symbol: string): Promise<DataRecentTrade[]> {
    const data: RecentTradeData[] = await this.fetch(
      `/trades?symbol=${symbol}`
    );
    return data.map((trade) => new DataRecentTrade(trade));
  }
}
