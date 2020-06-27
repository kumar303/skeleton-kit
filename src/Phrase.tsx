import React from "react";

import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";
import { ChildrenType } from "./utils/typeUtils";
import AsSkeleton from "./utils/AsSkeleton";

export interface Props {
  children: ChildrenType;
  className?: string;
}

export default function Phrase({ children, className }: Props) {
  return (
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
  );
}
