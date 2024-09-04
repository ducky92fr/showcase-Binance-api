import { InputForm } from "./InputForm";
import { VariantInput } from "../../types";
import { render, screen } from "../../test/setupTest";
import { TEST_ID_AUTOCOMPLETE_INPUT } from "./constants";

const mockOnChange = vi.fn();

const defaultProps = {
  currencySymbols: [{ symbol: "USD" }, { symbol: "EUR" }, { symbol: "GBP" }],
  variant: VariantInput.FILLED,
  onChange: mockOnChange,
  label: "Select your option",
  dataTestId: TEST_ID_AUTOCOMPLETE_INPUT,
};

describe("InputForm Component", () => {
  it("should render with the correct label", () => {
    render(<InputForm {...defaultProps} />);
    const labelTextElement = screen.getByLabelText("Select your option");

    expect(labelTextElement).toBeInTheDocument();
  });

  it("should render with correct data-testid", () => {
    render(<InputForm {...defaultProps} />);
    const inputElement = screen.getByTestId(TEST_ID_AUTOCOMPLETE_INPUT);

    expect(inputElement).toBeInTheDocument();
  });
});
