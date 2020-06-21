import React from "react";
import styled from "styled-components";

import { useTheme } from "./theme";
import OpacityPulse from "./OpacityPulse";

const Outer = styled.div`
  transform: translateY(1em);
`;

const Inner = styled(OpacityPulse)`
  border-top: ${(props) => `0.9em solid ${props.theme.skeletonColor}`};
`;

const WrappedText = styled.span`
  visibility: hidden;
`;

interface Props {
  children: string;
  className?: string;
}

export default function BorderText({ children, className }: Props) {
  const theme = useTheme();
  if (!theme.showSkeletons) {
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
