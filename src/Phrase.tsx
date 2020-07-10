import React from "react";

import { RealText } from ".";
import { Props as RealTextProps } from "./RealText";
import { ChildrenType, componentWithDefaults } from "./utils/typeUtils";

export interface Props extends RealTextProps {
  children: ChildrenType;
  className?: string;
}

const defaultProps: Partial<Props> = { defaultInitialCharCount: 12 };

const Phrase = componentWithDefaults<Props>()(
  ({ children, className, defaultInitialCharCount, ...textProps }) => {
    const allTextProps = { defaultInitialCharCount, ...textProps };
    return (
      <RealText className={className} {...allTextProps}>
        {children}
      </RealText>
    );
  },
  defaultProps
);

export default Phrase;
