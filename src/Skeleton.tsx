import * as React from "react";
import styled from "styled-components";

import OpacityPulse from "./OpacityPulse";

const StyledSpan = styled(OpacityPulse)`
  background-color: ${(props) => props.theme.color};
  border-radius: ${(props) => props.theme.borderRadius};
  box-decoration-break: clone;
`;

export interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function Skeleton({ children, className }: Props) {
  return <StyledSpan className={className}>{children}</StyledSpan>;
}
