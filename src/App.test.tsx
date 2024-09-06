import App from "./App"; // Import your main App component
import axios from "axios";

import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { render, screen, waitFor, userEvent } from "./test/setupTest";

import { TEST_ID_BUTTON_SUBMIT } from "./components/Button/contants";

import {
  mockBinanceSymbols,
  mockTicker24hResponse,
  mockTickerResponse,
} from "./components/API/constants";
import { TEST_ID_DATA_GRID } from "./components/DataTable/constants";
import { TEST_ID_SNACK_BAR } from "./components/SnackBar/constants";

const LABEL_SYMBOL_FOR_TEST = "BTC/USDT";
const FORM_PLACEHOLDER = "Select your currency pair";

const mockRecentTrades = [
  {
    id: 1,
    price: "100.00",
    qty: "0.1",
    quoteQty: "10.00",
    time: 1633052800,
    isBuyerMaker: true,
    isBestMatch: true,
  },
];
// Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (ui: JSX.Element) => {
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

afterEach(() => {
  vi.clearAllMocks();
  queryClient.clear();
});

describe("App integration tests", () => {
  describe("Before fetching data", () => {
    it('Users see "Binance Market Data" when rendered', () => {
      renderWithProviders(<App />);
      const pageTitle = screen.getByText("Binance Market Data");
      expect(pageTitle).toBeInTheDocument();
    });

    it("Users can't use form if there is no symbols", async () => {
      renderWithProviders(<App />);
      const inputForm = screen.getByLabelText("Select your currency pair");
      expect(inputForm).toBeDisabled();
    });

    it("Users can't click the get button if no option is selected in the form", () => {
      renderWithProviders(<App />);
      const button = screen.getByTestId(TEST_ID_BUTTON_SUBMIT);
      expect(button).toHaveProperty("disabled", true);
    });
  });
  describe("After fethching data", () => {
    beforeEach(() => {
      const mockNetworkResponse = {
        data: mockBinanceSymbols,
        status: 200,
        statusText: "OK",
      };
      axios.get = vi.fn().mockResolvedValue(mockNetworkResponse);
    });

    it("Users can now use the form with symbols fetched", async () => {
      renderWithProviders(<App />);

      const input = await screen.findByLabelText(FORM_PLACEHOLDER);
      userEvent.click(input);

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        const symbolOption = screen.getByText(LABEL_SYMBOL_FOR_TEST);
        expect(symbolOption).toBeInTheDocument();
        expect(options).toHaveLength(mockBinanceSymbols.symbols.length);
      });
    });

    describe("Table section", () => {
      beforeEach(() => {
        axios.get = vi
          .fn()
          .mockResolvedValueOnce({
            data: mockBinanceSymbols,
            status: 200,
            statusText: "OK",
          })
          .mockResolvedValueOnce({
            data: mockRecentTrades,
            status: 200,
            statusText: "OK",
          })
          .mockResolvedValueOnce({
            data: mockTickerResponse,
            status: 200,
            statusText: "OK",
          })
          .mockResolvedValueOnce({
            data: mockTicker24hResponse,
            status: 200,
            statusText: "OK",
          });
      });

      const selectCurrencyPair = async () => {
        const input = await screen.findByLabelText(FORM_PLACEHOLDER);
        userEvent.click(input);

        await waitFor(() => {
          const option = screen.getByText(LABEL_SYMBOL_FOR_TEST);
          userEvent.click(option);
        });

        await waitFor(() => {
          const getButton = screen.getByTestId(TEST_ID_BUTTON_SUBMIT);
          userEvent.click(getButton);
        });
      };

      afterEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
      });

      it("Users see the Recent trades for selected pair", async () => {
        renderWithProviders(<App />);

        const input = await screen.findByLabelText(FORM_PLACEHOLDER);
        userEvent.click(input);

        await waitFor(() => {
          const option = screen.getByText(LABEL_SYMBOL_FOR_TEST);
          userEvent.click(option);
        });

        await waitFor(() => {
          const getButton = screen.getByTestId(TEST_ID_BUTTON_SUBMIT);
          userEvent.click(getButton);
        });

        await waitFor(() => {
          expect(screen.getByText("Recent Trades")).toBeInTheDocument();
          expect(screen.getByTestId(TEST_ID_DATA_GRID)).toBeInTheDocument();
          expect(screen.getByText("time")).toBeInTheDocument();
          expect(screen.getByText("price")).toBeInTheDocument();
          expect(screen.getByText("quantity")).toBeInTheDocument();
          expect(screen.getByText("quote quantity")).toBeInTheDocument();
          expect(screen.getByText("100")).toBeInTheDocument();
          expect(screen.getByText("0.1")).toBeInTheDocument();
          expect(screen.getByText("10")).toBeInTheDocument();
          expect(
            screen.getByText("1/19/1970, 10:37:32 PM")
          ).toBeInTheDocument();
        });
      });

      it("Users see the Market Data for ticker and ticker 24h for selected pair", async () => {
        renderWithProviders(<App />);

        await selectCurrencyPair();
        await waitFor(() => {
          expect(screen.getByText("Market Data Ticker")).toBeInTheDocument();
          expect(
            screen.getByText("Market Data Ticker 24h")
          ).toBeInTheDocument();
        });
      });
    });
  });
  it("Users should see the snackbar if something went wrong", async () => {
    axios.get = vi.fn().mockRejectedValueOnce({
      data: { message: "Network Error test" },
      status: 500,
    });
    renderWithProviders(<App />);
    await waitFor(() => {
      expect(screen.getByTestId(TEST_ID_SNACK_BAR)).toBeInTheDocument();
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });
});
