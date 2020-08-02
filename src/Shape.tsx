import React from "react";
import styled from "styled-components";

import MaybeSkeletonGroup, {
  Props as MaybeSkeletonGroupProps,
} from "./MaybeSkeletonGroup";
import { ChildrenType, componentWithDefaults } from "./utils/typeUtils";
import MaybeSkeleton from "./utils/MaybeSkeleton";
import OpacityPulse from "./OpacityPulse";

enum ShapeKind {
  box = "box",
  circle = "circle",
}

interface ShellProps {
  heightStyle: string;
  widthStyle: string;
  kind: keyof typeof ShapeKind;
}

export const Shell = styled.div<ShellProps>`
  border-radius: ${(props) => (props.kind === "circle" ? "50%" : "0")};
  height: ${(props) => props.heightStyle};
  overflow: hidden;
  width: ${(props) => props.widthStyle};
`;

export interface Props extends MaybeSkeletonGroupProps, ShellProps {
  children: ChildrenType;
  className?: string;
}

const SkeletonShape = styled(OpacityPulse)`
  background-color: ${(props) => props.theme.skeletonKit.color};
  display: block;
  height: 100%;
  width: 100%;
`;

export const defaultProps: Partial<Props> = {
  heightStyle: "100px",
  widthStyle: "100px",
  kind: "box",
};

const Shape = componentWithDefaults<Props>()(
  ({ children, className, heightStyle, widthStyle, kind, ...groupProps }) => {
    if (!ShapeKind[kind]) {
      throw new Error(
        `kind must be one of ${Object.keys(ShapeKind)
          .map((s) => `"${s}"`)
          .join(", ")}`
      );
    }
    const wrap = (content: ChildrenType) => (
      <Shell
        className={className}
        heightStyle={heightStyle}
        kind={kind}
        widthStyle={widthStyle}
      >
        {content}
      </Shell>
    );
    return (
      <MaybeSkeletonGroup {...groupProps}>
        <MaybeSkeleton
          initialContent={() => ""}
          normalContent={wrap(children)}
          renderSkeleton={() => {
            return wrap(<SkeletonShape />);
          }}
        />
      </MaybeSkeletonGroup>
    );
  },
  defaultProps
);

export default Shape;
