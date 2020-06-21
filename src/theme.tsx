import { useContext } from "react";
import { ThemeContext } from "styled-components";

// TODO: add type safety (as documented) to components that use the theme.
export type SkeletonTheme = {
  skeletonColor?: string;
  showSkeletons?: boolean;
};

export function getAppliedTheme(theme: SkeletonTheme) {
  const appliedTheme: SkeletonTheme = {
    // TODO: maybe pick a better default.
    skeletonColor: theme.skeletonColor ?? "rgb(129, 129, 129, 1)",
    showSkeletons: theme.showSkeletons ?? false,
  };

  return appliedTheme;
}

export function useTheme() {
  return getAppliedTheme(useContext(ThemeContext));
}
