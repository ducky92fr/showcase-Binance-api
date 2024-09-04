import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { ComponentProps, Size, VariantButton } from "../../types";
import { TEST_ID_BUTTON_SUBMIT } from "./contants";

interface ButtonProps extends LoadingButtonProps, ComponentProps {
  label?: string;
  onClick: () => void;
  isLoading?: boolean;
}

export const Button = ({
  label = "Submit",
  size = Size.MEDIUM,
  variant = VariantButton.CONTAINED,
  onClick,
  dataTestId = TEST_ID_BUTTON_SUBMIT,
  isLoading = false,
}: ButtonProps) => {
  return (
    <LoadingButton
      data-testid={dataTestId}
      onClick={onClick}
      size={size}
      variant={variant}
      loading={isLoading}
    >
      {label}
    </LoadingButton>
  );
};
