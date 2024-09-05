import { useQuery } from "@tanstack/react-query";
import { BinanceApi } from "../API/BinanceApi";

const api = new BinanceApi();

export const useFetchSymbols = () => {
  const {
    data: symbols,
    error: errorFetchSymbols,
    isLoading: isLoadingFetchSymbols,
    ...props
  } = useQuery({
    queryKey: ["symbols"],
    queryFn: () => api.fetchSymbols(),
  });

  return {
    symbols,
    errorFetchSymbols,
    isLoadingFetchSymbols,
    ...props,
  };
};

export const useFetchTicker = (symbol: string) => {
  const {
    data: dataTicker,
    error: errorFetchTicker,
    isLoading: isLoadingTicker,
    refetch: fetchTicker,
    ...props
  } = useQuery({
    queryKey: ["ticker", symbol],
    queryFn: () => api.fetchTicker(symbol),
    enabled: false,
    networkMode: "always",
  });

  return {
    dataTicker,
    errorFetchTicker,
    isLoadingTicker,
    fetchTicker,
    ...props,
  };
};

export const useFetchTicker24h = (symbol: string) => {
  const {
    data: dataTicker24h,
    error: errorFetchTicker24h,
    isLoading: isLoadingTicker24h,
    refetch: fetchTicker24h,
    ...props
  } = useQuery({
    queryKey: ["ticker24h", symbol],
    queryFn: () => api.fetchTicker24h(symbol),
    enabled: false,
    networkMode: "always",
  });

  return {
    dataTicker24h,
    errorFetchTicker24h,
    isLoadingTicker24h,
    fetchTicker24h,
    ...props,
  };
};

export const useFetchRecentTrade = (symbol: string) => {
  const {
    data: recentTradeData,
    error: errorFetchRecentTrade,
    isLoading: isLoadingFetchRecentTrade,
    refetch: fetchRecentTrade,
    ...props
  } = useQuery({
    queryKey: ["recentTrade", symbol],
    queryFn: () => api.fetchRecentTrades(symbol),
    enabled: false,
    networkMode: "always",
  });

  return {
    recentTradeData,
    errorFetchRecentTrade,
    isLoadingFetchRecentTrade,
    fetchRecentTrade,
    ...props,
  };
};
