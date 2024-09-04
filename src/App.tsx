import { Button } from "./components/Button/Button";
import { InputForm } from "./components/InputForm/InputForm";
import { SnackBar, SnackBarOnClose } from "./components/SnackBar/SnackBar";
import "./App.css";

import { DataTableContainer } from "./components/DataTable/DataTableContainer";

import { Table } from "./components/Table/Table";

import { useState } from "react";
import { Option } from "./types";
import {
  useFetchSymbols,
  useFetchTicker,
  useFetchTicker24h,
  useFetchRecentTrade,
} from "./components/hooks/useFetch";

function App() {
  const [symbolSelected, setSymbol] = useState("");

  const { symbols, errorFetchSymbols, isLoadingFetchSymbols } =
    useFetchSymbols();

  const { dataTicker, errorFetchTicker, isLoadingTicker, fetchTicker } =
    useFetchTicker(symbolSelected);

  const {
    dataTicker24h,
    errorFetchTicker24h,
    isLoadingTicker24h,
    fetchTicker24h,
  } = useFetchTicker24h(symbolSelected);

  const {
    recentTradeData,
    errorFetchRecentTrade,
    isLoadingFetchRecentTrade,
    fetchRecentTrade,
  } = useFetchRecentTrade(symbolSelected);

  const error =
    errorFetchSymbols ||
    errorFetchRecentTrade ||
    errorFetchTicker24h ||
    errorFetchTicker;

  const onChange = (_: React.SyntheticEvent, value: Option | null) => {
    setSymbol(value?.value as string);
  };

  const onClick = () => {
    if (symbolSelected) {
      fetchTicker();
      fetchTicker24h();
      fetchRecentTrade();
    }
  };

  const onClose: SnackBarOnClose = () => {};
  return (
    <div className="main-app">
      <h1>Binance Market Data</h1>
      <div className="input-section">
        <InputForm
          isDisabled={isLoadingFetchSymbols || !symbols}
          onChange={onChange}
          options={symbols?.map((symbol) => symbol.formattedValue())}
          label="Select your currency pair"
        />
        <Button
          isDisabled={!symbolSelected}
          onClick={onClick}
          isLoading={isLoadingFetchSymbols}
          label="Get"
        />
      </div>
      <div className="table-section">
        <div className="left-section">
          {recentTradeData && (
            <DataTableContainer
              label="Recent Trades"
              data={recentTradeData.map((el) => el.formattedValue())}
            />
          )}
        </div>
        <div className="right-section">
          {dataTicker && (
            <Table
              tableHeaderTitle="Market Data Ticker"
              rows={dataTicker.formattedValue()}
            />
          )}
          {dataTicker24h && (
            <Table
              tableHeaderTitle="Market Data Ticker 24h"
              rows={dataTicker24h.formattedValue()}
            />
          )}
        </div>
      </div>

      <SnackBar isOpen={!!error} onClose={onClose} message={error?.message} />
    </div>
  );
}

export default App;
