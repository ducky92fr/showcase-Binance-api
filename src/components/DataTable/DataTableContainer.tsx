import { DataTable } from "./DataTable";
import { mockColumns, mockRows } from "./constants";

export const DataTableContainer = () => {
  //Here get the rows and the columns

  return <DataTable rows={mockRows} columns={mockColumns} />;
};
