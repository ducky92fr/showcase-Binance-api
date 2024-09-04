import { TextField, Autocomplete, BaseTextFieldProps } from "@mui/material";
import { ComponentProps, VariantInput, Option } from "../../types";
import { TEST_ID_AUTOCOMPLETE_INPUT } from "./constants";

interface InputFormProps extends BaseTextFieldProps, ComponentProps {
  options: { label: string; value: string | number }[];
  variant?: VariantInput;
  onChange: (_: React.SyntheticEvent, value: Option | null) => void;
  label?: string;
  isDisabled?: boolean;
}

export const InputForm = ({
  options = [],
  variant = VariantInput.OUTLINED,
  onChange,
  label = "Select your option",
  isDisabled = false,
  dataTestId = TEST_ID_AUTOCOMPLETE_INPUT,
}: InputFormProps) => {
  return (
    <Autocomplete
      disabled={isDisabled}
      data-testid={dataTestId}
      onChange={onChange}
      fullWidth
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} variant={variant} label={label} />
      )}
      size="small"
    />
  );
};
