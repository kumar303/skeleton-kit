import * as React from "react";
import styled from "styled-components";

import OpacityPulse from "./OpacityPulse";

const StyledSpan = styled(OpacityPulse)`
  // TODO: use bg color theme vars
  background-color: rgb(129, 129, 129, 1);
`;

export type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function Skeleton({ children, className }: Props) {
  return <StyledSpan className={className}>{children}</StyledSpan>;
}
