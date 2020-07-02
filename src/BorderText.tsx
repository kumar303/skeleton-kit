import React from "react";
import styled from "styled-components";

import InvisibleText from "./InvisibleText";
import MaybeSkeletonGroup, {
  Props as MaybeSkeletonGroupProps,
} from "./MaybeSkeletonGroup";
import OpacityPulse from "./OpacityPulse";
import { ChildrenType } from "./utils/typeUtils";
import MaybeSkeleton from "./utils/MaybeSkeleton";

const Shell = styled.span`
  display: block;
  transform: translateY(1em);
`;

const BorderSkeleton = styled(OpacityPulse)`
  border-top: ${(props) => `0.8em solid ${props.theme.color}`};
`;

export interface Props extends MaybeSkeletonGroupProps {
  children: ChildrenType;
  className?: string;
}

const BorderText: React.FunctionComponent<Props> = ({
  children,
  className,
  ...groupProps
}) => {
  return (
    <MaybeSkeletonGroup {...groupProps}>
      <MaybeSkeleton
        className={className}
        normalContent={children}
        renderSkeleton={() => {
          return (
            <Shell className={className}>
              <BorderSkeleton>
                <InvisibleText>{children}</InvisibleText>
              </BorderSkeleton>
            </Shell>
          );
        }}
      />
    </MaybeSkeletonGroup>
  );
};

export default BorderText;
