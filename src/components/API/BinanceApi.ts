import axios, { AxiosResponse } from "axios";
import { BinanceSymbol, CurrencyPair } from "../model/CurrencyPair";
import { DataMarketTicker24h, Ticker24hData } from "../model/DataMarket24h";
import { DataMarketTicker, TickerData } from "../model/DataMarketTicker";
import { DataRecentTrade, RecentTradeData } from "../model/DataRecentTrade";
import { ErrorHandling } from "../model/ErrorHandling";

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
  ): Promise<AxiosResponse<T>> {
    try {
      const queryStr = new URLSearchParams(queryParams).toString();
      const url = `${this.baseUrl}${endpoint}${queryStr ? `?${queryStr}` : ""}`;

      const response = await axios.get(url);
      return response;
    } catch (error) {
      ErrorHandling.handle(error);
      throw error;
    }
  }

  public async fetchSymbols(): Promise<CurrencyPair[]> {
    const response: AxiosResponse = await this.fetch(EXCHANGE_INFO);
    return response.data.symbols.map(
      (symbol: BinanceSymbol) => new CurrencyPair(symbol)
    );
  }

  public async fetchTicker(symbol: string): Promise<DataMarketTicker> {
    const response: AxiosResponse = await this.fetch(TICKER_DATA, { symbol });
    const dataMarketTicker: TickerData = response.data;
    return new DataMarketTicker(dataMarketTicker);
  }

  public async fetchTicker24h(symbol: string): Promise<DataMarketTicker24h> {
    const response: AxiosResponse = await this.fetch(TICKER_DATA_24h, {
      symbol,
    });
    const dataMarketTicker24h: Ticker24hData = response.data;
    return new DataMarketTicker24h(dataMarketTicker24h);
  }

  public async fetchRecentTrades(
    symbol: string,
    limit: number = 500
  ): Promise<DataRecentTrade[]> {
    const response: AxiosResponse = await this.fetch(RECENT_TRADE, {
      symbol,
      limit: limit.toString(),
    });
    const recentTrades: RecentTradeData[] = response.data;
    return recentTrades.map((trade) => new DataRecentTrade(trade));
  }
}
