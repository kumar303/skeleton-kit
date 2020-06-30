import React, { useContext } from "react";
import styled, { ThemeContext, ThemeProvider } from "styled-components";

import { getAppliedTheme, SkeletonTheme } from "./theme";
import { ChildrenType } from "./utils/typeUtils";

export const AltText = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export interface Props extends SkeletonTheme {
  children: ChildrenType;
}

export default function SkeletonGroup({ children, ...overrides }: Props) {
  // TODO: should skeleton theme props be namespaced so they don't
  // collide with user defined themes within styled-components?
  const themeContext = useContext(ThemeContext);
  const theme = getAppliedTheme({ ...themeContext, ...overrides });

  return (
    <ThemeProvider theme={theme}>
      {theme.showSkeletons && (
        // While showing skeletons, render alt text here instead of in
        // <InvisibleText> so that screen readers aren't repeating the
        // text so often.
        <AltText>{theme.altText}</AltText>
      )}
      {children}
    </ThemeProvider>
  );
}
