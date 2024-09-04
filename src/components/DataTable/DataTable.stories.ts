import type { Meta, StoryObj } from "@storybook/react";

import { DataTable as DataTableComponent } from "./DataTable";
import { mockColumns as columns, mockRows as rows } from "./constants";

const meta: Meta<typeof DataTableComponent> = {
  title: "Component/DataTable",
  component: DataTableComponent,
  args: {
    rows,
    columns,
  },
};

export default meta;

type Story = StoryObj<typeof DataTableComponent>;

export const DataTable: Story = {};
