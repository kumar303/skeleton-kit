import React from "react";

import { useTheme } from "../theme";
import { ChildrenType } from "./typeUtils";

export interface Props {
  normalContent: ChildrenType;
  className: string | undefined;
  renderSkeleton: () => JSX.Element;
}

const MaybeSkeleton: React.FunctionComponent<Props> = ({
  normalContent,
  className,
  renderSkeleton,
}) => {
  const theme = useTheme();
  if (!theme.showSkeletons) {
    return <span className={className}>{normalContent}</span>;
  }

  return renderSkeleton();
};

export default MaybeSkeleton;
