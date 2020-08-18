import { Meta } from "@storybook/react/types-6-0";

import GettingStarted from "./GettingStarted";

export default {
  title: "Documentation",
  component: GettingStarted,
  parameters: {
    // This isn't working as expected.
    // https://github.com/storybookjs/storybook/issues/7149
    // options: {
    //   showPanel: false,
    // },
    knobs: {
      disabled: true,
    },
  },
} as Meta;

export { GettingStarted };
