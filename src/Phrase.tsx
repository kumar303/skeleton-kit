import React from "react";

import { useTheme } from "./theme";
import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";

type Props = {
  children: string;
  className?: string;
};

export default function Phrase({ children, className }: Props) {
  const theme = useTheme();
  if (!theme.showSkeletons) {
    // TODO: think about the implications of not applying className here.
    return <>{children}</>;
  }
  return (
    <Skeleton className={className}>
      <InvisibleText>{children}</InvisibleText>
    </Skeleton>
  );
}
