import type { Meta, StoryObj } from "@storybook/react";

import { InputForm as InputFormComponent } from "./InputForm";
import { VariantInput } from "../../types";
import { fn } from "@storybook/test";
import { mockData } from "./constants";

const variantOptions = Object.values(VariantInput);

const meta: Meta<typeof InputFormComponent> = {
  title: "Component/Input",
  component: InputFormComponent,
  args: {
    currencySymbols: mockData,
    variant: VariantInput.FILLED,
    onChange: fn(),
  },
  argTypes: {
    variant: {
      options: variantOptions,
      control: "radio",
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputFormComponent>;

export const InputForm: Story = {};
