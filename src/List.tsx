import React from "react";

import { useTheme } from "./theme";
import { ChildrenType } from "./utils/typeUtils";

interface Props<ItemType extends unknown> {
  genItemKey: (item: ItemType | undefined) => string | undefined;
  initialCount: number;
  items: ItemType[];
  renderItem: (params: {
    isSkeleton: boolean;
    item: ItemType | undefined;
  }) => ChildrenType;
}

export default function List<ItemType extends unknown>({
  genItemKey,
  initialCount,
  items,
  renderItem,
}: Props<ItemType>): JSX.Element {
  const theme = useTheme();

  let itemCount = items.length;
  if (theme.showSkeletons && itemCount === 0) {
    itemCount = initialCount;
  }

  const rendered = [];

  for (let i = 0; i < itemCount; i += 1) {
    const item = items[i]; // this might be undefined
    const key = genItemKey(item) || String(`skeleton_${Math.random()}`);

    rendered.push(
      <React.Fragment key={key}>
        {renderItem({ isSkeleton: theme.showSkeletons, item })}
      </React.Fragment>
    );
  }

  return <>{rendered}</>;
}
