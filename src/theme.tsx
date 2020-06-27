import { useContext } from "react";
import { ThemeContext } from "styled-components";

// Note: src/@types/styled.d.ts imports this type to export the
// DefaultTheme for all styled-components which is a little weird.
export interface SkeletonTheme {
  altText?: string;
  borderRadius?: string;
  color?: string;
  showSkeletons?: boolean;
}

export function getAppliedTheme(theme: SkeletonTheme) {
  const appliedTheme: SkeletonTheme = {
    altText: theme.altText ?? "Loading…",
    borderRadius: theme.borderRadius ?? "none",
    // TODO: maybe pick a better default.
    color: theme.color ?? "rgb(129, 129, 129, 1)",
    showSkeletons: theme.showSkeletons ?? false,
  };

  return appliedTheme;
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error(
      "The context was unexpectedly empty. Did you wrap the components in <SkeletonGroup>?"
    );
  }
  return getAppliedTheme(theme);
}
