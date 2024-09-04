import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TEST_ID_SNACK_BAR } from "./constants";
import { ComponentProps } from "../../types";

export type SnackBarOnClose = (
  _event: React.SyntheticEvent | Event,
  reason?: SnackbarCloseReason
) => void;

interface SnackBarProps extends ComponentProps {
  isOpen: boolean;
  message: string;
  onClose: SnackBarOnClose;
}

export const SnackBar = ({
  isOpen,
  message,
  onClose,
  dataTestId = TEST_ID_SNACK_BAR,
}: SnackBarProps) => {
  const action = (
    <IconButton color="inherit" onClick={onClose}>
      <CloseIcon />
    </IconButton>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      data-testid={dataTestId}
      ContentProps={{
        sx: {
          background: "#cc3300",
        },
      }}
      open={isOpen}
      onClose={onClose}
      message={message}
      action={action}
    />
  );
};
