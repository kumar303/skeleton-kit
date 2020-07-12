import { boolean, radios } from "@storybook/addon-knobs";

export function getLoadSpeed(): number {
  return parseFloat(
    radios(
      "Loading speed (seconds)",
      { "0.1": "0.1", "0.5": "0.5", "3": "3", "5": "5" },
      "3"
    )
  );
}

export function getForcedLoading(): boolean {
  return boolean("Show loading state", false);
}
