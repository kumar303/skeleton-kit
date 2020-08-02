import React from "react";
import memoize from "lodash.memoize";
import EStyleSheet from "react-native-extended-stylesheet";
import { Text as NativeText } from "react-native";

import { useTheme } from "./theme";
import OpacityPulse from "./OpacityPulse";
import { ChildrenType, StyleType } from "./utils/typeUtils";

const getStyles = memoize((color: string, borderRadius: string) => {
  return EStyleSheet.create({
    text: {
      backgroundColor: color,
      borderRadius,
      boxDecorationBreak: "clone",
      whiteSpace: "inherit",
    },
  });
});

export interface Props {
  asBlock?: boolean;
  children?: ChildrenType;
  // TODO: remove this
  className?: string;
  style?: StyleType;
}

const Skeleton: React.FunctionComponent<Props> = ({
  asBlock,
  children,
  style,
}) => {
  const theme = useTheme();

  const styles = getStyles(theme.color, theme.borderRadius);

  const opacityStyle = asBlock ? { display: "flex", width: "100%" } : {};
  return (
    <OpacityPulse style={opacityStyle}>
      <NativeText
        style={[
          styles.text,
          {
            // TODO: This is needed on the web to overwrite explicit font
            // sizing. Is it needed on native?
            font: "inherit",
          },
          style,
        ]}
      >
        {children}
      </NativeText>
    </OpacityPulse>
  );
};

export default Skeleton;
