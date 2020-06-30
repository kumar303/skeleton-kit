import * as React from "react";
import styled from "styled-components";

import { useTheme } from "./theme";
import { ChildrenType } from "./utils/typeUtils";

const Hidden = styled.span`
  visibility: hidden;
`;

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

export interface Props {
  children: ChildrenType;
}

export default function InvisibleText({ children }: Props) {
  const theme = useTheme();
  return (
    <>
      <Hidden aria-hidden="true">{children}</Hidden>
      <AltText>{theme.altText}</AltText>
    </>
  );
}
