import * as React from "react";
import styled, { CSSProperties } from "styled-components";

import OpacityPulse from "./OpacityPulse";
import { ChildrenType } from "./utils/typeUtils";

const StyledSpan = styled(OpacityPulse)`
  background-color: ${(props) => props.theme.skeletonKit.color};
  border-radius: ${(props) => props.theme.skeletonKit.borderRadius};
  box-decoration-break: clone;
`;

export interface Props {
  children?: ChildrenType;
  className?: string;
  style?: CSSProperties;
}

const Skeleton: React.FunctionComponent<Props> = ({
  children,
  className,
  style,
}) => {
  return (
    <StyledSpan className={className} style={style}>
      {children}
    </StyledSpan>
  );
};

export default Skeleton;
