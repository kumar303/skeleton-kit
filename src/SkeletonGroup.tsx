import React, { useContext } from "react";
import { ThemeContext, ThemeProvider } from "styled-components";

import { getAppliedTheme, SkeletonTheme } from "./theme";
import { ChildrenType } from "./utils/typeUtils";

export interface Props extends Partial<SkeletonTheme> {
  children: ChildrenType;
}

const SkeletonGroup: React.FunctionComponent<Props> = ({
  children,
  ...theme
}) => {
  const themeContext = useContext(ThemeContext);
  const appliedTheme = getAppliedTheme({
    ...themeContext?.skeletonKit,
    ...theme,
  });

  return (
    <ThemeProvider
      theme={{
        // Provide a namespaced theme to avoid collisions with user themes.
        skeletonKit: appliedTheme,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default SkeletonGroup;
