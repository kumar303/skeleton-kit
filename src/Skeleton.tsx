import * as React from "react";
import styled from "styled-components";

import OpacityPulse from "./OpacityPulse";

const StyledSpan = styled(OpacityPulse)`
  // TODO: use bg color theme vars
  background-color: ${(props) => props.theme.skeletonColor};
`;

export interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function Skeleton({ children, className }: Props) {
  return <StyledSpan className={className}>{children}</StyledSpan>;
}
