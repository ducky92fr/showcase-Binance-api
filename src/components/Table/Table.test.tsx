import { render, screen } from "../../test/setupTest";
import { mockProps, TEST_ID_TABLE_VIEW } from "./contants";
import { Table } from "./Table";

describe("Table Component", () => {
  it("renders correctly with the provided data-testid", () => {
    render(<Table {...mockProps} />);
    const table = screen.getByTestId(TEST_ID_TABLE_VIEW);

    expect(table).toBeInTheDocument();
  });

  it("renders the table header title", () => {
    render(<Table {...mockProps} />);
    const headerTitle = screen.getByText(mockProps.tableHeaderTitle);

    expect(headerTitle).toBeInTheDocument();
  });

  it("renders the row labels and values correctly", () => {
    render(<Table {...mockProps} />);

    mockProps.rows.forEach((row) => {
      const label = screen.getByText(row.label);
      const value = screen.getByText(row.value.toLocaleString());

      expect(label).toBeInTheDocument();
      expect(value).toBeInTheDocument();
    });
  });
});
