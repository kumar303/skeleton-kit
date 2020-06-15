import * as React from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
  position: relative;
  animation: SkeletonPulse 2s infinite ease-in-out;

  @keyframes SkeletonPulse {
    0% {
      background-color: rgba(129, 129, 129, 0.5);
    }
    50% {
      background-color: rgb(129, 129, 129, 1);
    }
    100% {
      background-color: rgba(129, 129, 129, 0.5);
    }
  }
`;

type Props = {
  children: React.ReactNode;
};

export default function Skeleton({ children }: Props) {
  return <StyledSpan>{children}</StyledSpan>;
}
