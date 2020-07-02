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

const RealText: React.FunctionComponent<Props> = ({
  children,
  className,
  ...groupProps
}) => {
  // TODO: this is currently identical to Phrase but I think it might need different text configuration?
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
};

export default RealText;
