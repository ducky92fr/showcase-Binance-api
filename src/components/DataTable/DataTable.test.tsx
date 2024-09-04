import { render, screen } from "../../test/setupTest";
import { mockColumns, mockRows, TEST_ID_DATA_GRID } from "./constants";
import { DataTable } from "./DataTable";

describe("DataTable Component", () => {
  it("renders correctly with the data-testid", () => {
    render(<DataTable rows={mockRows} columns={mockColumns} />);
    const dataGrid = screen.getByTestId(TEST_ID_DATA_GRID);

    expect(dataGrid).toBeInTheDocument();
  });
});
