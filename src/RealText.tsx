import React from "react";

import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";
import { ChildrenType } from "./utils/typeUtils";
import AsSkeleton from "./utils/AsSkeleton";

export interface Props {
  children: ChildrenType;
  className?: string;
}

export default function RealText({ children, className }: Props) {
  // TODO: this is currently identical to Phrase but I think it might need different text configuration?
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
