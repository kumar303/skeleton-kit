import React, { useEffect, useRef, useState } from "react";
import memoize from "lodash.memoize";
import { View, Text as NativeText } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import { Text } from ".";
import { Props as TextProps, defaultProps as defaultTextProps } from "./Text";
import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";
import { ChildrenType, componentWithDefaults } from "./utils/typeUtils";

const getStyles = memoize(
  (pixelHeight: number | undefined, pixelWidth: number | undefined) => {
    return EStyleSheet.create({
      base: {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      recreated: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: `${pixelHeight}px`,
        justifyContent: "space-evenly",
        width: `${pixelWidth}px`,
      },
      line: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      },
      skeletonLine: {
        display: "flex",
        height: "0.8em",
        lineHeight: 1,
        // TODO: randomize
        width: "100%",
      },
    });
  }
);

interface StyleProps {
  children?: ChildrenType;
  className: string | undefined;
  pixelHeight?: number;
  pixelWidth?: number;
}

export interface Props extends TextProps {
  className?: string;
}

const SimulatedText = componentWithDefaults<Props>()(
  ({ className, ...textProps }) => {
    const [lineHeight, setLineHeight] = useState<null | number>(null);
    const [boxHeight, setBoxHeight] = useState<null | number>(null);
    const [boxWidth, setBoxWidth] = useState<null | number>(null);
    const shell = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (shell && shell.current) {
        setLineHeight(
          parseFloat(
            window
              .getComputedStyle(shell.current, null)
              .getPropertyValue("line-height")
          )
        );
        const rect = shell.current.getBoundingClientRect();
        setBoxHeight(rect.height);
        setBoxWidth(rect.width);
      }
    }, [shell, shell.current]);

    const styles = getStyles(boxHeight ?? undefined, boxWidth ?? undefined);

    return (
      <Text
        className={className}
        renderSkeleton={(content) => {
          if (boxWidth && boxHeight && lineHeight) {
            return (
              <NativeText style={[styles.base, styles.recreated]}>
                {new Array(Math.round(boxHeight / lineHeight))
                  .fill(1)
                  .map((item, idx) => (
                    <View
                      style={styles.line}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${boxHeight}-${boxWidth}-${idx}`}
                    >
                      <Skeleton asBlock style={styles.skeletonLine} />
                    </View>
                  ))}
              </NativeText>
            );
          }

          // TODO: figure out how to not use a div here. The dom ref is
          // needed to calculate line-height which I'm not sure how to do
          // in react-native. We could use onLayout for height/width.
          return (
            <div ref={shell}>
              <NativeText style={styles.base}>
                <InvisibleText>{content}</InvisibleText>
              </NativeText>
            </div>
          );
        }}
        {...textProps}
      />
    );
  },
  defaultTextProps
);

export default SimulatedText;
