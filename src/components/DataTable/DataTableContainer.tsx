import { DataTable } from "./DataTable";

type DataType = object;

const buildColumns = (data: DataType[]) => {
  const columns = Object.keys(data[0]).map((key) => {
    if (key === "time") {
      return { field: key, name: key, width: 200 };
    }
    if (key === "id") {
      return { field: key, name: key, sortable: false };
    }
    return { field: key, name: key, flex: 1 };
  });

  return { columns };
};

interface DataTableContainerProps {
  label: string;
  data: DataType[];
}
export const DataTableContainer = ({
  label,
  data,
}: DataTableContainerProps) => {
  const { columns } = buildColumns(data);

  return <DataTable label={label} rows={data} columns={columns} />;
};
