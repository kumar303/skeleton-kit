import React, { PureComponent, useCallback, useState } from "react";

import { FixedSizeList, ListChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import { Story } from "../helpers/styles";

type Item = {
  name: string;
};

function ExampleWrapper({
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage,

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading,

  // Array of items loaded so far.
  items,

  // Callback function responsible for loading the next page of items.
  loadNextPage,
}: {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: Item[];
  loadNextPage: (startIndex: number, stopIndex: number) => Promise<any> | null;
}) {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => null : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  // Render an item or a loading indicator.
  const Item = ({ index, style }: ListChildComponentProps) => {
    let content;
    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      content = items[index].name;
    }

    return <div style={style}>{content}</div>;
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          itemCount={itemCount}
          onItemsRendered={onItemsRendered}
          ref={ref}
          height={150}
          itemSize={35}
          width={300}
        >
          {Item}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}

const VirtualListsStory: React.FunctionComponent<Record<
  string,
  unknown
>> = () => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);

  const loadNextPage = useCallback(() => {
    return new Promise((resolve) => {
      setIsNextPageLoading(true);
      setTimeout(() => {
        setHasNextPage(items.length < 100);
        setIsNextPageLoading(false);
        setItems(
          [...items].concat(
            new Array(10).fill(true).map(() => ({ name: "Example name" }))
          )
        );
        resolve(null);
      }, 2500);
    });
  }, [items, isNextPageLoading]);

  return (
    <Story>
      <ExampleWrapper
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        items={items}
        loadNextPage={loadNextPage}
      />
    </Story>
  );
};

export default VirtualListsStory;
