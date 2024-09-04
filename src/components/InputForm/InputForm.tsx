import { TextField, Autocomplete, BaseTextFieldProps } from "@mui/material";
import { ComponentProps, VariantInput } from "../../types";
import { TEST_ID_AUTOCOMPLETE_INPUT } from "./constants";

interface InputFormProps extends BaseTextFieldProps, ComponentProps {
  currencySymbols: { symbol: string }[];
  variant?: VariantInput;
  onChange: () => void;
  label?: string;
}

export const InputForm = ({
  currencySymbols,
  variant = VariantInput.OUTLINED,
  onChange,
  label = "Select your option",
  dataTestId = TEST_ID_AUTOCOMPLETE_INPUT,
}: InputFormProps) => {
  return (
    <Autocomplete
      data-testid={dataTestId}
      onChange={onChange}
      fullWidth
      options={currencySymbols}
      getOptionLabel={(option) => option.symbol}
      renderInput={(params) => (
        <TextField {...params} variant={variant} label={label} />
      )}
      size="small"
    />
  );
};
