import React from "react";
import styled from "styled-components";

import { RealText } from ".";
import {
  Props as RealTextProps,
  defaultProps as realTextDefaultProps,
} from "./RealText";
import InvisibleText from "./InvisibleText";
import OpacityPulse from "./OpacityPulse";
import { ChildrenType, componentWithDefaults } from "./utils/typeUtils";

const Shell = styled.span`
  display: block;
  transform: translateY(1em);
`;

const BorderSkeleton = styled(OpacityPulse)`
  border-top: ${(props) => `0.8em solid ${props.theme.color}`};
`;

export interface Props extends RealTextProps {
  children: ChildrenType;
  className?: string;
}

const BorderText = componentWithDefaults<Props>()(
  ({ className, ...textProps }) => {
    return (
      <RealText
        className={className}
        renderSkeleton={(content) => {
          return (
            <Shell className={className}>
              <BorderSkeleton>
                <InvisibleText>{content}</InvisibleText>
              </BorderSkeleton>
            </Shell>
          );
        }}
        {...textProps}
      />
    );
  },
  realTextDefaultProps
);

export default BorderText;
