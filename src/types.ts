export enum Size {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

export enum VariantButton {
  OUTLINED = "outlined",
  CONTAINED = "contained",
}

export enum VariantInput {
  OUTLINED = "outlined",
  FILLED = "filled",
}

export interface ComponentProps {
  dataTestId?: string;
}

export type Option = {
  value: string | number;
  label: string;
};
