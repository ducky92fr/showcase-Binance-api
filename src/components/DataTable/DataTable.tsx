import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ComponentProps } from "../../types";
import { TEST_ID_DATA_GRID } from "./constants";
import "./DataTable.css";
interface TableDataProps extends ComponentProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}
export const DataTable = ({
  rows,
  columns,
  dataTestId = TEST_ID_DATA_GRID,
}: TableDataProps) => {
  return (
    <table className="data-table">
      <caption className="caption">Recent Trades</caption>
      <tbody>
        <DataGrid
          data-testid={dataTestId}
          density="compact"
          disableColumnResize
          disableColumnSelector
          disableRowSelectionOnClick
          disableColumnMenu
          rows={rows}
          columns={columns}
        />
      </tbody>
    </table>
  );
};
