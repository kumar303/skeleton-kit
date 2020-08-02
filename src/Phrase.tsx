import React from "react";

import { Text } from ".";
import { Props as TextProps } from "./Text";
import { ChildrenType, componentWithDefaults } from "./utils/typeUtils";
import Skeleton from "./Skeleton";
import InvisibleText from "./InvisibleText";
import { Props as MaybeSkeletonGroupProps } from "./MaybeSkeletonGroup";

export interface Props extends MaybeSkeletonGroupProps {
  children: ChildrenType;
  className?: string;
  defaultInitialCharCount: TextProps["defaultInitialCharCount"];
}

const defaultProps: Partial<Props> = { defaultInitialCharCount: 12 };

const Phrase = componentWithDefaults<Props>()(
  ({ children, className, defaultInitialCharCount, ...groupProps }) => {
    return (
      <Text
        className={className}
        defaultInitialCharCount={defaultInitialCharCount}
        renderSkeleton={(content) => {
          return (
            <Skeleton>
              <InvisibleText>{content}</InvisibleText>
            </Skeleton>
          );
        }}
        {...groupProps}
      >
        {children}
      </Text>
    );
  },
  defaultProps
);

export default Phrase;
