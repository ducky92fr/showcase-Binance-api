import App from "./App"; // Import your main App component
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

const LABEL_SYMBOL_FOR_TEST = "BTC/USDT";
// Create QueryClient
const queryClient = new QueryClient({});

const renderWithProviders = (ui: JSX.Element) => {
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe("App integration tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    queryClient.clear();
  });

  //Common test no depending on the api fetch
  it("should disable the button if no option is selected in the InputForm", () => {
    renderWithProviders(<App />);
    const button = screen.getByTestId(TEST_ID_BUTTON_SUBMIT);
    expect(button).toHaveProperty("disabled", true);
  });

  it('should display "Binance Market Data" when rendered', () => {
    renderWithProviders(<App />);
    expect(screen.getByText("Binance Market Data")).toBeInTheDocument();
  });

  // //Situation depending on the data returned from api fetch
  it("should disable InputForm if no symbols list is returned", () => {
    renderWithProviders(<App />);
    // Wait for the symbols to be fetched
    expect(screen.getByLabelText("Select your currency pair")).toBeDisabled();
  });

  it("users should be able to select currency pair in the input form and should be able to click button once option selected", async () => {
    const mockNetworkResponse = {
      ok: true,
      statusText: "OK",
      json: async () => mockBinanceSymbols,
    } as Response;

    global.fetch = vi.fn().mockResolvedValue(mockNetworkResponse);

    renderWithProviders(<App />);

    const input = screen.getByLabelText("Select your currency pair");
    expect(input).toHaveProperty("disabled", true);

    // Now waitFor the symbols returned, in this phase the input must be enabled,
    // but this leads to confusing behavior  of how waitFor and test works, we double check the input

    await waitFor(() => {
      expect(input).toHaveProperty("disabled", false);
    });

    expect(input).not.toHaveProperty("disabled", true);

    //   //test when users select the options
    const autocomplete = screen.getByLabelText("Select your currency pair");
    userEvent.click(autocomplete);
    await waitFor(() => {
      const options = screen.getAllByRole("option");

      expect(options).toHaveLength(mockBinanceSymbols.symbols.length);

      // Option text must match the mock data
      expect(screen.getByText("BTC/USDT")).toBeInTheDocument();
    });

    //   //Now user select option
    const option = screen.getByText("BTC/USDT");
    userEvent.click(option);

    const button = screen.getByTestId(TEST_ID_BUTTON_SUBMIT);

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });

  it("should display Recent Trades, Market Data Ticker, and Market Data Ticker24h tables after clicking the Get button", async () => {
    // Mock the network response for symbols
    global.fetch = vi
      .fn()
      // Mock the symbols fetch
      .mockResolvedValueOnce({
        ok: true,
        statusText: "OK",
        json: async () => mockBinanceSymbols,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        statusText: "OK",
        json: async () => [
          {
            id: 1,
            price: "100.00",
            qty: "0.1",
            quoteQty: "10.00",
            time: 1633052800,
            isBuyerMaker: true,
            isBestMatch: true,
          },
        ],
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTickerResponse,
      })
      // Mock the 24h ticker fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockTicker24hResponse,
      });

    renderWithProviders(<App />);

    const input = await screen.findByLabelText("Select your currency pair");
    userEvent.click(input);

    await waitFor(() => {
      const option = screen.getByText(LABEL_SYMBOL_FOR_TEST);
      userEvent.click(option);
    });

    // Click the "Get" button
    await waitFor(() => {
      const getButton = screen.getByTestId(TEST_ID_BUTTON_SUBMIT);
      userEvent.click(getButton);
    });

    // Wait for the Recent Trades table to appear
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
      expect(screen.getByText("1/19/1970, 10:37:32 PM")).toBeInTheDocument();

      expect(screen.getByText("Market Data Ticker")).toBeInTheDocument();
      expect(screen.getByText("Market Data Ticker 24h")).toBeInTheDocument();
    });
  });
});
