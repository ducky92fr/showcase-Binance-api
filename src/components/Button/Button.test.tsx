import { Button } from "./Button";
import { Size, VariantButton } from "../../types";

import { TEST_ID_BUTTON_SUBMIT } from "./contants";
import { render, screen, userEvent, waitFor } from "../../test/setupTest";

const mockOnClick = vi.fn();

const defaultProps = {
  label: "Submit",
  size: Size.MEDIUM,
  variant: VariantButton.CONTAINED,
  onClick: mockOnClick,
  dataTestId: TEST_ID_BUTTON_SUBMIT,
  isLoading: false,
};

describe("Button Component", () => {
  it("should render with correct data-testid", () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByTestId(TEST_ID_BUTTON_SUBMIT);

    expect(button).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByTestId(TEST_ID_BUTTON_SUBMIT);
    userEvent.click(button);

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  it("should disabled when loading", () => {
    render(<Button {...defaultProps} isLoading={true} />);
    const button = screen.getByTestId(TEST_ID_BUTTON_SUBMIT);

    expect(button).toBeDisabled();
  });
});
