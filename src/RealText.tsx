import React from "react";

import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";
import MaybeSkeletonGroup, {
  Props as MaybeSkeletonGroupProps,
} from "./MaybeSkeletonGroup";
import { ChildrenType, componentWithDefaults } from "./utils/typeUtils";
import MaybeSkeleton from "./utils/MaybeSkeleton";
import { genSentence } from "./utils/text";

export interface Props extends MaybeSkeletonGroupProps {
  children: ChildrenType;
  className?: string;
  defaultInitialCharCount: number;
}

const defaultProps: Partial<Props> = { defaultInitialCharCount: 200 };

const RealText = componentWithDefaults<Props>()(
  ({ children, defaultInitialCharCount, className, ...groupProps }) => {
    return (
      <MaybeSkeletonGroup {...groupProps}>
        <MaybeSkeleton
          className={className}
          initialContent={(theme) => {
            // TODO: make it so all text implementations get access to
            // this, not just RealText.
            // TODO: add an optional min/max char length randomizer.
            const { initialCharCount = defaultInitialCharCount } = theme;
            return genSentence(initialCharCount);
          }}
          normalContent={children}
          renderSkeleton={(content) => {
            return (
              <Skeleton className={className}>
                <InvisibleText>{content}</InvisibleText>
              </Skeleton>
            );
          }}
        />
      </MaybeSkeletonGroup>
    );
  },
  defaultProps
);

export default RealText;
