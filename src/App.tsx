import Grid from "@mui/material/Grid2";
import { Button } from "./components/Button/Button";
import { InputForm } from "./components/InputForm/InputForm";
import { SnackBar, SnackBarOnClose } from "./components/SnackBar/SnackBar";
import "./App.css";

import { DataTableContainer } from "./components/DataTable/DataTableContainer";
import { mockProps } from "./components/Table/contants";
import { Table } from "./components/Table/Table";

function App() {
  const onChange = () => {};
  const onClick = () => {};
  const mockData = [
    { symbol: "ETH/BTC" },
    { symbol: "BNB/BTC" },
    { symbol: "NEO/BTC" },
  ];
  const onClose: SnackBarOnClose = () => {};
  return (
    <Grid container direction="column">
      <Grid display="flex" justifyContent="center">
        <h1>Binance Market Data</h1>
      </Grid>

      <Grid container spacing={4} direction="column" alignItems="center">
        <Grid>
          <h3>Select a currency pair to view data</h3>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          size={8}
        >
          <Grid size={8}>
            <InputForm
              onChange={onChange}
              currencySymbols={mockData}
              label="Select your currency pair"
            />
          </Grid>

          <Grid>
            <Button onClick={onClick} isLoading={false} label="Get" />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          size={12}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <DataTableContainer />
          </Grid>
          <Grid container direction="column" size={{ xs: 12, md: 6 }}>
            <Grid>
              <Table {...mockProps} />
            </Grid>
            <Grid>
              <Table {...mockProps} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <SnackBar isOpen={true} onClose={onClose} message="here" />
    </Grid>
  );
}

export default App;
