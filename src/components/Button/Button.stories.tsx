import type { Meta, StoryObj } from "@storybook/react";

import { Button as ButonComponent } from "./Button";
import { Size, VariantButton } from "../../types";
import { fn } from "@storybook/test";

const variantOptions = Object.values(VariantButton);
const sizeOptions = Object.values(Size);

const meta: Meta<typeof ButonComponent> = {
  title: "Component/Button",
  component: ButonComponent,
  args: {
    label: "Search",
    variant: VariantButton.CONTAINED,
    size: Size.MEDIUM,
    onClick: fn(),
    isLoading: false,
  },
  argTypes: {
    variant: {
      options: variantOptions,
      control: "radio",
    },
    isLoading: {
      options: [true, false],
      control: "radio",
    },
    size: {
      options: sizeOptions,
      control: "radio",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButonComponent>;

export const Button: Story = {};
