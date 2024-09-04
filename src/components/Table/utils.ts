import { Row } from "./Table";

export enum Value {
  positive = "positive",
  negative = "negative",
}

export const conditionalStyling = (row: Row) => {
  if (!row.label.toLocaleLowerCase().includes("change")) return "";

  if (typeof row.value === "number" && row.value < 0) {
    return Value.negative;
  }
  return Value.positive;
};
