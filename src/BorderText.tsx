import * as React from "react";
import styled from "styled-components";

import OpacityPulse from "./OpacityPulse";

const Outer = styled.div`
  transform: translateY(1em);
`;

const Inner = styled(OpacityPulse)`
  // TODO: use bg color theme vars
  border-top: 0.9em solid rgb(129, 129, 129, 1);
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
