import React from "react";

import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";
import MaybeSkeletonGroup, {
  Props as MaybeSkeletonGroupProps,
} from "./MaybeSkeletonGroup";
import { ChildrenType } from "./utils/typeUtils";
import MaybeSkeleton from "./utils/MaybeSkeleton";

export interface Props extends MaybeSkeletonGroupProps {
  children: ChildrenType;
  className?: string;
}

export default function Phrase({ children, className, ...groupProps }: Props) {
  return (
    <MaybeSkeletonGroup {...groupProps}>
      <MaybeSkeleton
        className={className}
        normalContent={children}
        renderSkeleton={() => {
          return (
            <Skeleton className={className}>
              <InvisibleText>{children}</InvisibleText>
            </Skeleton>
          );
        }}
      />
    </MaybeSkeletonGroup>
  );
}
