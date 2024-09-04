import Grid from "@mui/material/Grid2";
import { Button } from "./components/Button/Button";
import { InputForm } from "./components/InputForm/InputForm";
import { SnackBar, SnackBarOnClose } from "./components/SnackBar/SnackBar";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { DataTableContainer } from "./components/DataTable/DataTableContainer";

import { Table } from "./components/Table/Table";
import {
  fetchRecentTrades,
  fetchSymbols,
  fetchTicker,
  fetchTicker24h,
} from "./utils";
import { useState } from "react";
import { Option } from "./types";

function App() {
  const [symbolSelected, setSymbol] = useState("");

  const {
    data: symbols,
    error,
    isLoading,
  } = useQuery({ queryKey: ["symbols"], queryFn: fetchSymbols });

  const { data: tickerData, refetch } = useQuery({
    queryKey: ["ticker"],
    queryFn: () => fetchTicker(symbolSelected),
    enabled: false,
  });

  const { data: tickerData24h, refetch: refetch24h } = useQuery({
    queryKey: ["ticker24h"],
    queryFn: () => fetchTicker24h(symbolSelected),
    enabled: false,
  });

  const { data: recentTradeData, refetch: refetchRecentTrade } = useQuery({
    queryKey: ["recentTrade"],
    queryFn: () => fetchRecentTrades(symbolSelected),
    enabled: false,
  });

  const onChange = (_: React.SyntheticEvent, value: Option | null) => {
    setSymbol(value?.value as string);
  };

  const handleFetch = () => {
    if (symbolSelected) {
      refetch();
      refetch24h();
      refetchRecentTrade();
    }
  };

  const onClose: SnackBarOnClose = () => {};
  return (
    <Grid container direction="column">
      <Grid display="flex" justifyContent="center">
        <h1>Binance Market Data</h1>
      </Grid>

      <Grid container spacing={4} direction="column" alignItems="center">
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          size={8}
        >
          <Grid size={8}>
            <InputForm
              isDisabled={isLoading || !symbols}
              onChange={onChange}
              options={symbols}
              label="Select your currency pair"
            />
          </Grid>

          <Grid>
            <Button
              isDisabled={!symbolSelected}
              onClick={handleFetch}
              isLoading={isLoading}
              label="Get"
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          size={12}
        >
          <Grid size={{ xs: 12, md: 8 }}>
            {recentTradeData && (
              <DataTableContainer
                label="Recent Trades"
                data={recentTradeData.map((el) => el.formattedValue())}
              />
            )}
          </Grid>
          <Grid container direction="column" size={{ xs: 12, md: 6 }}>
            <Grid>
              {tickerData && (
                <Table
                  tableHeaderTitle="Market Data Ticker"
                  rows={tickerData.formattedValue()}
                />
              )}
            </Grid>
            <Grid>
              {tickerData24h && (
                <Table
                  tableHeaderTitle="Market Data Ticker 24h"
                  rows={tickerData24h.formattedValue()}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <SnackBar isOpen={!!error} onClose={onClose} message={error?.message} />
    </Grid>
  );
}

export default App;
