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
            const {
              initialCharCount = defaultInitialCharCount,
              initialCharCountRange,
            } = theme;

            let count = initialCharCount;

            if (initialCharCountRange !== undefined) {
              if (
                !Array.isArray(initialCharCountRange) ||
                initialCharCountRange[0] === undefined ||
                initialCharCountRange[1] === undefined
              ) {
                throw new Error(
                  "initialCharCountRange must be an array of two numbers (min, max)"
                );
              }
              const [min, max] = initialCharCountRange;
              if (min > max) {
                throw new Error(
                  `initialCharCountRange of [${min}, ${max}] has a minimum value greater than the maximum value`
                );
              }

              count = min + Math.round(Math.random() * (max - min));
            }

            return genSentence(count);
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
