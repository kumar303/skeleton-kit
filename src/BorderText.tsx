import React from "react";
import memoize from "lodash.memoize";
import { View, Text as NativeText } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import { Text } from ".";
import { Props as TextProps, defaultProps as defaultTextProps } from "./Text";
import InvisibleText from "./InvisibleText";
import OpacityPulse from "./OpacityPulse";
import { ChildrenType, componentWithDefaults } from "./utils/typeUtils";
import { useTheme } from "./theme";

const getStyles = memoize((color: string) => {
  return EStyleSheet.create({
    shell: {
      display: "block",
      transform: "translateY(1em)",
    },
    skeleton: {
      borderTopWidth: "0.8em",
      borderTopColor: color,
    },
  });
});

export interface Props extends TextProps {
  children: ChildrenType;
  className?: string;
}

const BorderSkeleton: React.FunctionComponent<{ children: ChildrenType }> = ({
  children,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme.color);
  return (
    <View style={styles.shell}>
      <OpacityPulse>
        <NativeText style={styles.skeleton}>
          <InvisibleText>{children}</InvisibleText>
        </NativeText>
      </OpacityPulse>
    </View>
  );
};

const BorderText = componentWithDefaults<Props>()(
  ({ className, ...textProps }) => {
    return (
      <Text
        className={className}
        renderSkeleton={(content) => {
          return <BorderSkeleton>{content}</BorderSkeleton>;
        }}
        {...textProps}
      />
    );
  },
  defaultTextProps
);

export default BorderText;
