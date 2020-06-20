import * as React from "react";

import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";

type Props = {
  children: string;
  className?: string;
  asSkeleton?: boolean;
};

export default function RealText({
  asSkeleton = false,
  children,
  className,
}: Props) {
  if (!asSkeleton) {
    return <>{children}</>;
  }
  return (
    <Skeleton className={className}>
      <InvisibleText>{children}</InvisibleText>
    </Skeleton>
  );
}
