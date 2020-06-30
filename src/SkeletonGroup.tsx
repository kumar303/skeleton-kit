import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "styled-components";

import { getAppliedTheme, SkeletonTheme } from "./theme";
import { ChildrenType } from "./utils/typeUtils";

export interface Props extends SkeletonTheme {
  children: ChildrenType;
}

export default function SkeletonGroup({ children, ...theme }: Props) {
  // TODO: should skeleton theme props be namespaced so they don't
  // collide with user defined themes within styled-components?
  const themeContext = useContext(ThemeContext);
  const appliedTheme = getAppliedTheme({ ...themeContext, ...theme });

  return <ThemeProvider theme={appliedTheme}>{children}</ThemeProvider>;
}
