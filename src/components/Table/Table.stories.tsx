import type { Meta, StoryObj } from "@storybook/react";

import { Table as TableComponent } from "./Table";
import { mockProps } from "./contants";

const meta: Meta<typeof TableComponent> = {
  title: "Component/Table",
  component: TableComponent,
  args: {
    ...mockProps,
  },
};

export default meta;

type Story = StoryObj<typeof TableComponent>;

export const Table: Story = {};
