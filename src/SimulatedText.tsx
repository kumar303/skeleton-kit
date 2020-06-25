import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useTheme } from "./theme";
import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";
import { ChildrenType } from "./utils/typeUtils";

const RefSpan = styled.span`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

interface StyleProps {
  children?: ChildrenType;
  className?: string;
  pixelHeight?: number;
  pixelWidth?: number;
}

const RecreatedSpan = styled(RefSpan)<StyleProps>`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: ${(props) => `${props.pixelHeight}px`};
  justify-content: space-evenly;
  width: ${(props) => `${props.pixelWidth}px`};
`;

const Line = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SkeletonLine = styled(Skeleton)`
  height: 0.8em;
  line-height: 1;
  // TODO: randomize
  width: 100%;
`;

interface Props {
  children: string;
  className?: string;
}

export default function SimulatedText({ children, className }: Props) {
  const theme = useTheme();
  if (!theme.showSkeletons) {
    return <>{children}</>;
  }

  const [lineHeight, setLineHeight] = useState<null | number>(null);
  const [boxHeight, setBoxHeight] = useState<null | number>(null);
  const [boxWidth, setBoxWidth] = useState<null | number>(null);
  const shell = useRef<HTMLParagraphElement>(null);

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
  }, [shell]);

  if (boxWidth && boxHeight && lineHeight) {
    // TODO: check rounding
    return (
      <RecreatedSpan
        className={className}
        pixelHeight={boxHeight}
        pixelWidth={boxWidth}
      >
        {new Array(Math.round(boxHeight / lineHeight))
          .fill(1)
          .map((item, idx) => (
            <Line key={`${boxHeight}-${boxWidth}-${idx}`}>
              <SkeletonLine />
            </Line>
          ))}
      </RecreatedSpan>
    );
  }

  return (
    <RefSpan className={className} ref={shell}>
      <InvisibleText>{children}</InvisibleText>
    </RefSpan>
  );
}
