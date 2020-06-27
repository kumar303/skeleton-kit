import React from "react";

import { useTheme } from "../theme";
import { ChildrenType } from "./typeUtils";

export interface Props {
  normalContent: ChildrenType;
  className: string | undefined;
  renderSkeleton: () => JSX.Element;
}

export default function AsSkeleton({
  normalContent,
  className,
  renderSkeleton,
}: Props) {
  const theme = useTheme();
  if (!theme.showSkeletons) {
    return <span className={className}>{normalContent}</span>;
  }

  return renderSkeleton();
}
