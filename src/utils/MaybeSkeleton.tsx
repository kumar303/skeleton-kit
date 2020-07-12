import React from "react";

import { useTheme, SkeletonTheme } from "../theme";
import { ChildrenType, componentWithDefaults } from "./typeUtils";

export type InitialContent = (theme: SkeletonTheme) => string;

type RenderContent = (content: ChildrenType) => JSX.Element;

export type RenderSkeleton = RenderContent;
export type RenderNormalContent = RenderContent;

export interface Props {
  normalContent: ChildrenType;
  initialContent: InitialContent;
  renderNormalContent: RenderNormalContent;
  renderSkeleton: RenderSkeleton;
}

const defaultProps: Partial<Props> = {
  renderNormalContent: (content) => <>{content}</>,
};

const MaybeSkeleton = componentWithDefaults<Props>()(
  ({ initialContent, normalContent, renderNormalContent, renderSkeleton }) => {
    const theme = useTheme();
    if (!theme.showSkeletons) {
      return renderNormalContent(normalContent);
    }

    let content = normalContent;
    if (initialContent && !content) {
      content = initialContent(theme);
    }

    return renderSkeleton(content);
  },
  defaultProps
);

export default MaybeSkeleton;
