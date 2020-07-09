import React from "react";

import { RealText } from ".";
import { Props as MaybeSkeletonGroupProps } from "./MaybeSkeletonGroup";
import { ChildrenType } from "./utils/typeUtils";

export interface Props extends MaybeSkeletonGroupProps {
  children: ChildrenType;
  className?: string;
}

const Phrase: React.FunctionComponent<Props> = ({
  children,
  className,
  ...textProps
}) => {
  return (
    <RealText className={className} defaultInitialCharCount={12} {...textProps}>
      {children}
    </RealText>
  );
};

export default Phrase;
