import { useContext } from "react";
import { ThemeContext } from "styled-components";

// Note: src/@types/styled.d.ts imports this type to export the
// DefaultTheme for all styled-components which is a little weird.
export interface SkeletonTheme {
  altText: string;
  borderRadius: string;
  color: string;
  initialCharCount: number | undefined;
  initialCharCountRange: [number, number] | undefined;
  showSkeletons: boolean;
}

export interface GlobalTheme {
  skeletonKit: SkeletonTheme;
}

export function getAppliedTheme(theme: Partial<SkeletonTheme>): SkeletonTheme {
  const appliedTheme: SkeletonTheme = {
    altText: theme.altText ?? "Loading…",
    borderRadius: theme.borderRadius ?? "none",
    // TODO: maybe pick a better default color.
    // TODO: consider detecting the inherited color
    color: theme.color ?? "rgb(129, 129, 129, 1)",
    initialCharCount: theme.initialCharCount,
    initialCharCountRange: theme.initialCharCountRange,
    showSkeletons: theme.showSkeletons ?? false,
  };

  return appliedTheme;
}

export function useTheme(): SkeletonTheme {
  const theme = useContext(ThemeContext)?.skeletonKit;
  if (!theme) {
    throw new Error(
      "The context was unexpectedly empty. Did you wrap the components in <SkeletonGroup>?"
    );
  }
  return getAppliedTheme(theme);
}
