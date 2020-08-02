import React, { useEffect, useRef } from "react";
import { Animated, Easing, Platform } from "react-native";

import { ChildrenType, StyleType } from "./utils/typeUtils";

export interface Props {
  children?: ChildrenType;
  style?: StyleType;
}

const OpacityPulse: React.FunctionComponent<Props> = ({ children, style }) => {
  const isWeb = Platform.OS === "web";
  const initialOpacity = 0.2;
  const opacityRef = useRef(new Animated.Value(initialOpacity)).current;

  const animationDuration = Math.random() * 1.5 + 2;
  const animationDurationMs = animationDuration * 1000;
  const timing = {
    easing: Easing.bezier(0.65, 0.05, 0.36, 1),
    useNativeDriver: true,
  };

  // TODO: make this a safer global name somehow.
  const animationName = "SkelOpacityPulse";

  useEffect(() => {
    if (isWeb) {
      // Hmm, this is kind of weird but it seems like the animation would
      // perform better? I dunno.
      const styleElement = document.createElement("style");
      // TODO: check if it exists first, I guess.
      document.head.appendChild(styleElement);
      const styleSheet = styleElement.sheet;
      const keyframesStyle = `
        @keyframes ${animationName} {
          0% { opacity: 0.2; }
          25% { opacity: 0.1; }
          50% { opacity: 0.25; }
          75% { opacity: 0.1; }
          100% { opacity: 0.2; }
        }
      `;
      if (styleSheet) {
        styleSheet.insertRule(keyframesStyle, styleSheet.cssRules.length);
      }
      return;
    }

    // This is a React Native implementation.
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityRef, {
          ...timing,
          toValue: 0.1,
          duration: animationDurationMs / 4,
        }),
        Animated.timing(opacityRef, {
          ...timing,
          toValue: 0.2,
          duration: animationDurationMs / 4,
        }),
      ]),
      {
        iterations: -1,
      }
    ).start();
  });

  const baseStyle = isWeb
    ? {
        animationName,
        // TODO: use a variable to share these values up above.
        animationTimingFunction: "cubic-bezier(0.65, 0.05, 0.36, 1)",
        animationDuration: `${animationDuration}s`,
        animationIterationCount: "infinite",
        animationDirection: "normal",
        animationFillMode: "forwards",
        // TODO: figure out how to do something like this.
        // @media (prefers-reduced-motion: reduce) {
        //   animation: none;
        // }
      }
    : {};

  return (
    <Animated.Text
      style={[
        {
          ...baseStyle,
          // TODO: This is needed on the web to overwrite explicit font
          // sizing. Is it needed on native?
          font: "inherit",
          opacity: isWeb ? initialOpacity : opacityRef,
          whiteSpace: "inherit",
        },
        style,
      ]}
    >
      {children}
    </Animated.Text>
  );
};

export default OpacityPulse;
