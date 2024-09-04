import { SnackBar } from "./SnackBar";
import { render, screen, userEvent, waitFor } from "../../test/setupTest";
import { TEST_ID_SNACK_BAR } from "./constants";

const mockOnClick = vi.fn();

const defaultProps = {
  isOpen: true,
  message: "Test message",
  onClose: mockOnClick,
  dataTestId: TEST_ID_SNACK_BAR,
};

describe("SnackBar Component", () => {
  it("should render when isOpen is true", () => {
    render(<SnackBar {...defaultProps} />);
    const snackBarElement = screen.getByTestId(TEST_ID_SNACK_BAR);

    expect(snackBarElement).toBeInTheDocument();
  });
  it("should not render when isOpen is false", () => {
    render(<SnackBar {...defaultProps} isOpen={false} />);
    const snackBarElement = screen.queryByTestId("snack-bar");

    expect(snackBarElement).not.toBeInTheDocument();
  });

  it("should display the correct message", () => {
    render(<SnackBar {...defaultProps} />);
    const message = screen.getByText("Test message");

    expect(message).toBeInTheDocument();
  });

  it("should call onClose handler when action button is clicked", async () => {
    render(<SnackBar {...defaultProps} />);
    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(() => {
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
