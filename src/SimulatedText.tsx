import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";
import MaybeSkeletonGroup, {
  Props as MaybeSkeletonGroupProps,
} from "./MaybeSkeletonGroup";
import { ChildrenType } from "./utils/typeUtils";
import MaybeSkeleton from "./utils/MaybeSkeleton";

const RefSpan = styled.span`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

interface StyleProps {
  children?: ChildrenType;
  className: string | undefined;
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

export interface Props extends MaybeSkeletonGroupProps {
  children: ChildrenType;
  className?: string;
}

const SimulatedText: React.FunctionComponent<Props> = ({
  children,
  className,
  ...groupProps
}) => {
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

  return (
    <MaybeSkeletonGroup {...groupProps}>
      <MaybeSkeleton
        className={className}
        normalContent={children}
        renderSkeleton={() => {
          if (boxWidth && boxHeight && lineHeight) {
            return (
              <RecreatedSpan
                className={className}
                pixelHeight={boxHeight}
                pixelWidth={boxWidth}
              >
                {new Array(Math.round(boxHeight / lineHeight))
                  .fill(1)
                  .map((item, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
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
        }}
      />
    </MaybeSkeletonGroup>
  );
};

export default SimulatedText;
