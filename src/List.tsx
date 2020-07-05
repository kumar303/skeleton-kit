import React from "react";

import { useTheme } from "./theme";
import { ChildrenType } from "./utils/typeUtils";

export interface Props<ItemType = unknown> {
  // It doesn't quite make sense to pass children to <List> so this
  // ensures the caller doesn't do it by accident.
  children?: undefined;
  genItemKey: (item: ItemType | undefined) => string | undefined;
  initialCount: number;
  items: ItemType[] | null | undefined;
  renderAll?: (params: {
    renderedItems: JSX.Element;
    hasZeroItems: boolean;
  }) => JSX.Element;
  renderItem: (params: {
    isSkeleton: boolean;
    item: ItemType | undefined;
  }) => ChildrenType;
}

export default function List<ItemType = unknown>({
  genItemKey,
  initialCount,
  items,
  renderAll,
  renderItem,
}: Props<ItemType>): JSX.Element {
  const theme = useTheme();

  let itemCount = items ? items.length : 0;
  if (theme.showSkeletons && itemCount === 0) {
    // Since the skeleton state is unknown (aka "loading"), pretend there
    // are actually some list items. This allows us to render skeleton
    // items.
    itemCount =
      // Set a default for non TS users.
      initialCount || 4;
  }

  const rendered = [];

  for (let i = 0; i < itemCount; i += 1) {
    const item = items
      ? // This value will be undefined while showing skeletons.
        items[i]
      : undefined;
    const key = genItemKey(item) || String(`skeleton_${Math.random()}`);

    rendered.push(
      <React.Fragment key={key}>
        {renderItem({ isSkeleton: theme.showSkeletons, item })}
      </React.Fragment>
    );
  }

  const render = renderAll || (({ renderedItems }) => renderedItems);

  return render({
    renderedItems: <>{rendered}</>,
    // Only declare hasZeroItems=true when not showing skeletons.
    hasZeroItems: !theme.showSkeletons && (!items || items.length === 0),
  });
}
