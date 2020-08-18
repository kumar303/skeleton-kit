import { create } from "@storybook/theming";
import { addons } from "@storybook/addons";

addons.setConfig({
  panelPosition: "right",
  showPanel: true,
  theme: create({
    base: "light",
    brandTitle: "skeleton-kit",
    brandUrl: "https://kumar303.github.io/skeleton-kit",
  }),
  showRoots: true,
});
