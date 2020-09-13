import React from "react";

import { Text } from ".";
import { Props as TextProps } from "./Text";
import { ChildrenType, componentWithDefaults } from "./utils/typeUtils";

export interface Props extends TextProps {
  children: ChildrenType;
}

const defaultProps: Partial<Props> = { defaultInitialCharCount: 12 };

const Phrase = componentWithDefaults<Props>()(
  ({ children, defaultInitialCharCount, ...textProps }) => {
    const allTextProps = { defaultInitialCharCount, ...textProps };
    return <Text {...allTextProps}>{children}</Text>;
  },
  defaultProps
);

export default Phrase;
