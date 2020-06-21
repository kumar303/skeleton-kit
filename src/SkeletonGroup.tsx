import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "styled-components";

import { getAppliedTheme, SkeletonTheme } from "./theme";

type Props = SkeletonTheme & {
  children: React.ReactNode;
};

export default function SkeletonGroup({ children, ...theme }: Props) {
  const themeContext = useContext(ThemeContext);
  const appliedTheme = getAppliedTheme({ ...themeContext, ...theme });

  return <ThemeProvider theme={appliedTheme}>{children}</ThemeProvider>;
}
