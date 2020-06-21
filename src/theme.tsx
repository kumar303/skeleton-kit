import { useContext } from "react";
import { ThemeContext } from "styled-components";

// Note: src/@types/styled.d.ts imports this type to export the
// DefaultTheme for all styled-components which is a little weird.
export interface SkeletonTheme {
  skeletonColor?: string;
  showSkeletons?: boolean;
}

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
