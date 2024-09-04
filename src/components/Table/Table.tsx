import { ComponentProps } from "../../types";
import { TEST_ID_SNACK_BAR } from "./contants";
import { conditionalStyling } from "./utils";

import "./Table.css";
export type Row = { label: string; value: string | number };
interface TableProps extends ComponentProps {
  tableHeaderTitle: string;
  rows: Row[];
}

export const Table = ({
  tableHeaderTitle,
  rows,
  dataTestId = TEST_ID_SNACK_BAR,
}: TableProps) => {
  return (
    <table className="table" data-testid={dataTestId}>
      <caption className="caption">{tableHeaderTitle}</caption>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="row">
            <td className="row-label">{row.label}</td>
            <td className={`row-value ` + conditionalStyling(row)}>
              {row.value.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
