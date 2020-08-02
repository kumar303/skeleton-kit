import * as React from "react";
import { View } from "react-native";
import styled from "styled-components";
import memoize from "lodash.memoize";
import EStyleSheet from "react-native-extended-stylesheet";

import MaybeSkeletonGroup, {
  Props as MaybeSkeletonGroupProps,
} from "./MaybeSkeletonGroup";
import { ChildrenType, componentWithDefaults } from "./utils/typeUtils";
import MaybeSkeleton from "./utils/MaybeSkeleton";
import OpacityPulse from "./OpacityPulse";
import { useTheme } from "./theme";

enum ShapeKind {
  box = "box",
  circle = "circle",
}

interface ShellProps {
  heightStyle: string;
  widthStyle: string;
  kind: keyof typeof ShapeKind;
}

// TODO: fix tests that depend on this and remove it.
export const Shell = styled.div<ShellProps>`
  border-radius: ${(props) => (props.kind === "circle" ? "50%" : "0")};
  height: ${(props) => props.heightStyle};
  overflow: hidden;
  width: ${(props) => props.widthStyle};
`;

const getStyles = memoize(
  (kind: keyof typeof ShapeKind, heightStyle: string, widthStyle: string) => {
    return EStyleSheet.create({
      view: {
        height: heightStyle,
        overflow: "hidden",
        width: widthStyle,
        borderRadius: kind === "circle" ? "50%" : "0",
      },
    });
  }
);

const skeletonShapeStyles = EStyleSheet.create({
  skeleton: {
    display: "block",
    height: "100%",
    width: "100%",
  },
});

const SkeletonShape: React.FunctionComponent = () => {
  const theme = useTheme();
  return (
    <OpacityPulse
      style={[
        skeletonShapeStyles.skeleton,
        {
          backgroundColor: theme.color,
        },
      ]}
    />
  );
};

export interface Props extends MaybeSkeletonGroupProps, ShellProps {
  children: ChildrenType;
  // TODO: remove this
  className?: string;
}

export const defaultProps: Partial<Props> = {
  heightStyle: "100px",
  widthStyle: "100px",
  kind: "box",
};

const Shape = componentWithDefaults<Props>()(
  ({ children, heightStyle, widthStyle, kind, ...groupProps }) => {
    if (!ShapeKind[kind]) {
      throw new Error(
        `kind must be one of ${Object.keys(ShapeKind)
          .map((s) => `"${s}"`)
          .join(", ")}`
      );
    }
    const styles = getStyles(kind, heightStyle, widthStyle);

    const wrap = (content: ChildrenType) => (
      <View style={styles.view}>{content}</View>
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
