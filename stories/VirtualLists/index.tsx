import React, { useState } from "react";

import { FixedSizeList, ListChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { names } from "../helpers/butterflyData";
import { getLoadSpeed } from "../helpers/knobs";
import { Phrase, SkeletonGroup } from "../../src";
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

  // Are there more items to load?
  // (This information comes from the most recent API request.)
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);

  // Array of items loaded so far.
  const [items, setItems] = useState<Item[]>([]);

  // If there are more items to be loaded then add extra rows to hold the skeletons.
  const itemCount = hasNextPage ? items.length + 10 : items.length;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  // Callback function responsible for loading the next page of items.
  const loadNextPage = () => {
    setIsNextPageLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        setHasNextPage(items.length < 100);
        setIsNextPageLoading(false);
        setItems([...items].concat(names.map((n) => ({ name: n }))));
        resolve(null);
      }, loadSpeed * 1000);
    });
  };

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => null : loadNextPage;

  const Item = ({ index, style }: ListChildComponentProps) => {
    const showSkeletons = !isItemLoaded(index);
    const content = showSkeletons ? "" : items[index].name;

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
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  itemCount={itemCount}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  height={contentWidth}
                  itemSize={35}
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
