import React from "react";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      exclude: ["dataTestId"],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{ display: "flex", justifyContent: "center", height: "400px" }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default preview;
