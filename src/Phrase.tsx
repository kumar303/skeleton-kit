import React from "react";

import { useTheme } from "./theme";
import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";

export interface Props {
  children: string;
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
