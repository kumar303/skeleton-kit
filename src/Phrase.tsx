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

const Phrase: React.FunctionComponent<Props> = ({
  children,
  className,
  ...groupProps
}) => {
  return (
    <MaybeSkeletonGroup {...groupProps}>
      <MaybeSkeleton
        className={className}
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
};

export default Phrase;
