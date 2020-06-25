import React from "react";

import { useTheme } from "./theme";
import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";
import { ChildrenType } from "./utils/typeUtils";

interface Props {
  children: ChildrenType;
  className?: string;
}

export default function RealText({ children, className }: Props) {
  const theme = useTheme();
  if (!theme.showSkeletons) {
    return <>{children}</>;
  }
  return (
    <Skeleton className={className}>
      <InvisibleText>{children}</InvisibleText>
    </Skeleton>
  );
}
