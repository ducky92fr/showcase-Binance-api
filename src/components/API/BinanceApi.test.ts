import { describe, it, expect, vi, beforeEach } from "vitest";

import {
  mockBinanceSymbols,
  mockRecentTradesResponse,
  mockTicker24hResponse,
  mockTickerResponse,
} from "./constants";
import { BinanceApi } from "./BinanceApi";

const SYMBOL = "BTCUSDT";
describe("BinanceApi", () => {
  let api: BinanceApi;

  beforeEach(() => {
    api = new BinanceApi();
    vi.clearAllMocks();
  });

  it("should fetch symbols correctly", async () => {
    const mockNetworkResponse = {
      ok: true,
      statusText: "OK",
      json: async () => mockBinanceSymbols,
    } as Response;

    global.fetch = vi.fn().mockResolvedValue(mockNetworkResponse);
    const response = await api.fetchSymbols();

    expect(response).toEqual(mockBinanceSymbols.symbols);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.binance.com/api/v3/exchangeInfo"
    );
  });

  it("should fetch ticker correctly", async () => {
    const mockNetworkResponse = {
      ok: true,
      statusText: "OK",
      json: async () => mockTickerResponse,
    } as Response;

    global.fetch = vi.fn().mockResolvedValue(mockNetworkResponse);

    const result = await api.fetchTicker(SYMBOL);

    expect(result).toEqual(mockTickerResponse);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.binance.com/api/v3/ticker?symbol=BTCUSDT"
    );
  });

  it("should fetch 24-hour ticker correctly", async () => {
    const mockNetworkResponse = {
      ok: true,
      statusText: "OK",
      json: async () => mockTicker24hResponse,
    } as Response;

    global.fetch = vi.fn().mockResolvedValue(mockNetworkResponse);

    const result = await api.fetchTicker24h(SYMBOL);
    expect(result).toEqual(mockTicker24hResponse);
  });

  it("should fetch recent trades correctly with correct trades", async () => {
    const mockNetworkResponse = {
      ok: true,
      statusText: "OK",
      json: async () => mockRecentTradesResponse,
    } as Response;

    const numberTrades = 2;
    global.fetch = vi.fn().mockResolvedValue(mockNetworkResponse);
    const result = await api.fetchRecentTrades(SYMBOL, numberTrades);
    expect(result).toEqual(mockRecentTradesResponse);
  });
});
