import * as React from "react";
import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    background-color: rgba(129, 129, 129, 0.5);
  }
  50% {
    background-color: rgb(129, 129, 129, 1);
  }
  100% {
    background-color: rgba(129, 129, 129, 0.5);
  }
`;

const StyledSpan = styled.span`
  animation: ${pulse} 2s infinite ease-in-out;
`;

export type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function Skeleton({ children, className }: Props) {
  return <StyledSpan className={className}>{children}</StyledSpan>;
}
