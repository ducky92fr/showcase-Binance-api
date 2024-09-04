import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ComponentProps } from "../../types";
import { TEST_ID_DATA_GRID } from "./constants";
import "./DataTable.css";
interface TableDataProps extends ComponentProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  label: string;
}
export const DataTable = ({
  rows,
  columns,
  dataTestId = TEST_ID_DATA_GRID,
  label,
}: TableDataProps) => {
  return (
    <div className="data-table">
      <div className="caption">{label}</div>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20 },
          },
        }}
        data-testid={dataTestId}
        density="compact"
        disableColumnResize
        disableColumnSelector
        disableRowSelectionOnClick
        disableColumnMenu
        rows={rows}
        columns={columns}
      />
    </div>
  );
};
