import React from "react";

import { useTheme, SkeletonTheme } from "../theme";
import { ChildrenType } from "./typeUtils";

export type InitialContent = (theme: SkeletonTheme) => string;

export type RenderSkeleton = (content: ChildrenType) => JSX.Element;

export interface Props {
  normalContent: ChildrenType;
  initialContent: InitialContent;
  renderSkeleton: RenderSkeleton;
}

const MaybeSkeleton: React.FunctionComponent<Props> = ({
  initialContent,
  normalContent,
  renderSkeleton,
}) => {
  const theme = useTheme();
  if (!theme.showSkeletons) {
    return <>{normalContent}</>;
  }

  let content = normalContent;
  if (initialContent && !content) {
    content = initialContent(theme);
  }

  return renderSkeleton(content);
};

export default MaybeSkeleton;
