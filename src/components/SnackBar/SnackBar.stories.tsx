import type { Meta, StoryObj } from "@storybook/react";

import { SnackBar as SnackBarComponent, SnackBarOnClose } from "./SnackBar";
import { useState } from "react";

const meta: Meta<typeof SnackBarComponent> = {
  title: "Component/SnackBar",
  component: SnackBarComponent,
};

export default meta;

type Story = StoryObj<typeof SnackBarComponent>;

const SnackBarWithHook = () => {
  const [isOpen, setOpen] = useState(true);

  const onClose: SnackBarOnClose = (_event, reason?) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackBarComponent
      isOpen={isOpen}
      onClose={onClose}
      message="This is snack bar"
    />
  );
};

export const SnackBar: Story = {
  render: () => <SnackBarWithHook />,
};
