import React from "react";

import { useTheme } from "./theme";
import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";
import { ChildrenType } from "./utils/typeUtils";

export interface Props {
  children: ChildrenType;
  className?: string;
}

export default function Phrase({ children, className }: Props) {
  const theme = useTheme();
  if (!theme.showSkeletons) {
    return <span className={className}>{children}</span>;
  }
  return (
    <Skeleton className={className}>
      <InvisibleText>{children}</InvisibleText>
    </Skeleton>
  );
}
