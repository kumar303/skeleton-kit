import React from "react";
import styled from "styled-components";

import { useTheme } from "./theme";
import InvisibleText from "./InvisibleText";
import OpacityPulse from "./OpacityPulse";
import { ChildrenType } from "./utils/typeUtils";

const Shell = styled.span`
  display: block;
  transform: translateY(1em);
`;

const BorderSkeleton = styled(OpacityPulse)`
  border-top: ${(props) => `0.8em solid ${props.theme.color}`};
`;

export interface Props {
  children: ChildrenType;
  className?: string;
}

export default function BorderText({ children, className }: Props) {
  const theme = useTheme();
  if (!theme.showSkeletons) {
    return <span className={className}>{children}</span>;
  }
  return (
    <Shell className={className}>
      <BorderSkeleton>
        <InvisibleText>{children}</InvisibleText>
      </BorderSkeleton>
    </Shell>
  );
}
