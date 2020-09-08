import React, { useState } from "react";

import { FixedSizeList, ListChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { Phrase, SkeletonGroup } from "../../src";
import { names } from "../helpers/butterflyData";
import { getLoadSpeed } from "../helpers/knobs";
import {
  CtrlButton,
  Content,
  StyledItem,
  StyledList,
  contentWidth,
} from "./styles";
import { Story, colors } from "../helpers/styles";

type Item = {
  name: string;
};

function genLoaderKey() {
  return `loader-${Math.random()}`;
}

const VirtualListsStory: React.FunctionComponent<Record<
  string,
  unknown
>> = () => {
  const loadSpeed = getLoadSpeed();

  const [loaderKey, setLoaderKey] = useState<string>(genLoaderKey());
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);

  // Add extra rows to hold the skeletons.
  const itemCount = items.length + 10;

  const isItemLoaded = (index: number) => index < items.length;

  const loadNextPage = () => {
    if (isNextPageLoading) {
      return null;
    }
    setIsNextPageLoading(true);

    // Simulate a slow API response.
    setTimeout(() => {
      setIsNextPageLoading(false);
      setItems([...items].concat(names.map((n) => ({ name: n }))));
    }, loadSpeed * 1000);

    return null;
  };

  const Item = ({ index, style }: ListChildComponentProps) => {
    const content = items[index] && items[index].name;

    return (
      <StyledItem altBg={Boolean(index % 2)} style={style}>
        <Phrase
          initialCharCountRange={[12, 20]}
          showSkeletons={!isItemLoaded(index)}
          color={colors.black}
        >
          {content}
        </Phrase>
      </StyledItem>
    );
  };

  const seeInitial = () => {
    // Reset the key mostly just to reset the scrollbars.
    setLoaderKey(genLoaderKey());
    setItems([]);
  };

  return (
    <Story>
      <Content>
        <CtrlButton onClick={seeInitial}>See initial state</CtrlButton>
        <StyledList>
          <SkeletonGroup borderRadius="0.4rem">
            <InfiniteLoader
              key={loaderKey}
              isItemLoaded={isItemLoaded}
              itemCount={itemCount}
              loadMoreItems={loadNextPage}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  itemCount={itemCount}
                  layout="vertical"
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  height={contentWidth}
                  // This is the height in pixels of each item.
                  // This assumes 1rem = 16px.
                  itemSize={3 * 16}
                  width={contentWidth}
                >
                  {Item}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          </SkeletonGroup>
        </StyledList>
      </Content>
    </Story>
  );
};

export default VirtualListsStory;
