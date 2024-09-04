import { DataMarketTicker24h } from "./components/model/DataMarket24h";
import { DataMarketTicker } from "./components/model/DataMarketTicker";
import {
  DataRecentTrade,
  RecentTradeData,
} from "./components/model/DataRecentTrade";

interface BinanceSymbol {
  symbol: string;
  status: string;
  baseAsset: string;
  quoteAsset: string;
}

export const fetchSymbols = async () => {
  const response = await fetch("https://api.binance.com/api/v3/exchangeInfo");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.symbols.map((symbol: BinanceSymbol) => ({
    value: symbol.symbol,
    label: symbol.baseAsset + "/" + symbol.quoteAsset,
  }));
};

export const fetchTicker = async (
  symbol: string
): Promise<DataMarketTicker> => {
  const response = await fetch(
    `https://api.binance.com/api/v3/ticker?symbol=${symbol}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return new DataMarketTicker(data);
};

export const fetchTicker24h = async (
  symbol: string
): Promise<DataMarketTicker24h> => {
  const response = await fetch(
    `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return new DataMarketTicker24h(data);
};

export const fetchRecentTrades = async (
  symbol: string
): Promise<DataRecentTrade[]> => {
  const response = await fetch(
    `https://api.binance.com/api/v3/trades?symbol=${symbol}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = (await response.json()) as RecentTradeData[];

  return data.map((trade) => {
    return new DataRecentTrade(trade);
  });
};
