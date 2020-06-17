import * as React from "react";
import styled from "styled-components";

type Props = {
  children: string;
  asSkeleton?: boolean;
};

const Outer = styled.div`
  transform: translateY(1em);
`;

const Inner = styled.span`
  border-top: 0.9em solid;
  animation: SkeletonTextPulse 2s infinite ease-in-out;

  @keyframes SkeletonTextPulse {
    0% {
      border-color: rgba(129, 129, 129, 0.5);
    }
    50% {
      border-color: rgb(129, 129, 129, 1);
    }
    100% {
      border-color: rgba(129, 129, 129, 0.5);
    }
  }
`;

const WrappedText = styled.span`
  visibility: hidden;
`;

export default function Text({ asSkeleton = false, children }: Props) {
  if (!asSkeleton) {
    return <>{children}</>;
  }
  return (
    <Outer>
      <Inner>
        <WrappedText>{children}</WrappedText>
      </Inner>
    </Outer>
  );
}
