import React from "react";

import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";
import MaybeSkeletonGroup, {
  Props as MaybeSkeletonGroupProps,
} from "./MaybeSkeletonGroup";
import { ChildrenType } from "./utils/typeUtils";
import AsSkeleton from "./utils/AsSkeleton";

export interface Props extends MaybeSkeletonGroupProps {
  children: ChildrenType;
  className?: string;
}

export default function RealText({
  children,
  className,
  ...groupProps
}: Props) {
  // TODO: this is currently identical to Phrase but I think it might need different text configuration?
  return (
    <MaybeSkeletonGroup {...groupProps}>
      <AsSkeleton
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
