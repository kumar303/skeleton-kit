import * as React from "react";
import styled, { keyframes } from "styled-components";

const Outer = styled.div`
  transform: translateY(1em);
`;

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

const Inner = styled.span`
  border-top: 0.9em solid;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const WrappedText = styled.span`
  visibility: hidden;
`;

type Props = {
  children: string;
  className?: string;
  asSkeleton?: boolean;
};

export default function BorderText({
  asSkeleton = false,
  children,
  className,
}: Props) {
  if (!asSkeleton) {
    return <>{children}</>;
  }
  return (
    <Outer className={className}>
      <Inner>
        <WrappedText>{children}</WrappedText>
      </Inner>
    </Outer>
  );
}
