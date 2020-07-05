import React from "react";
import { mount } from "enzyme";

import { List, SkeletonGroup } from ".";
import { Props as SkeletonGroupProps } from "./SkeletonGroup";
import { Props as ListProps } from "./List";

describe(__filename, () => {
  function render<ItemType = unknown>({
    genItemKey = () => `example-${Math.random()}`,
    initialCount = 4,
    items = [],
    renderItem = ({ item }) => <div>{item}</div>,
    ...moreProps
  }: Partial<ListProps<ItemType>> & Partial<SkeletonGroupProps>) {
    const props = {
      genItemKey,
      initialCount,
      items,
      renderItem,
      ...moreProps,
    };
    const root = mount(
      <SkeletonGroup {...props}>
        <List<ItemType> {...props} />
      </SkeletonGroup>
    );
    return root.find(List);
  }

  it.each(["true", "false"])(
    "renders items while showSkeletons=%s",
    (showSkeletonsFlag) => {
      const showSkeletons = showSkeletonsFlag === "true";
      const className = "CustomClass";

      const items = ["one", "two"];
      const renderItem = jest.fn(({ item }) => (
        <span className={className}>{item}</span>
      ));

      const root = render<string>({
        items,
        renderItem,
        showSkeletons,
      });

      const spans = root.find(`.${className}`);
      expect(spans).toHaveLength(items.length);
      expect(spans.at(0)).toHaveText(items[0]);
      expect(spans.at(1)).toHaveText(items[1]);

      expect(renderItem).toHaveBeenCalledWith(
        expect.objectContaining({
          isSkeleton: showSkeletons,
        })
      );
    }
  );

  it.each(["[empty list]", "null", "undefined"])(
    "renders a skeleton list for items=%s while showing skeletons",
    (emptyKind) => {
      const className = "CustomClass";
      const initialCount = 3;

      let items;
      if (emptyKind === "null") {
        items = null;
      } else if (emptyKind === "undefined") {
        items = undefined;
      } else {
        items = [];
      }
      const renderItem = jest.fn(({ item }) => (
        <span className={className}>{item}</span>
      ));
      const renderAll = jest.fn(({ renderedItems }) => renderedItems);

      const root = render<string>({
        initialCount,
        items,
        renderAll,
        renderItem,
        showSkeletons: true,
      });

      const spans = root.find(`.${className}`);
      expect(spans).toHaveLength(initialCount);

      expect(renderItem).toHaveBeenCalledWith(
        expect.objectContaining({
          isSkeleton: true,
          item: undefined,
        })
      );

      expect(renderAll).toHaveBeenCalledWith(
        expect.objectContaining({
          hasZeroItems: false,
        })
      );
    }
  );

  it.each(["[empty list]", "null", "undefined"])(
    "renders zero items for items=%s while not showing skeletons",
    (emptyKind) => {
      const className = "CustomClass";
      const initialCount = 3;

      let items;
      if (emptyKind === "null") {
        items = null;
      } else if (emptyKind === "undefined") {
        items = undefined;
      } else {
        items = [];
      }
      const renderItem = jest.fn(({ item }) => (
        <span className={className}>{item}</span>
      ));
      const renderAll = jest.fn(({ renderedItems }) => renderedItems);

      const root = render<string>({
        initialCount,
        items,
        renderAll,
        renderItem,
        showSkeletons: false,
      });

      const spans = root.find(`.${className}`);
      // No actual items should have been rendered.
      expect(spans).toHaveLength(0);

      expect(renderItem).not.toHaveBeenCalled();

      expect(renderAll).toHaveBeenCalledWith(
        expect.objectContaining({
          hasZeroItems: true,
        })
      );
    }
  );

  it("calls genItemKey for each item while not showing skeletons", () => {
    const items = ["one", "two"];
    const genItemKey = jest.fn((item) => `key_${item}`);

    render<string>({ genItemKey, items });

    expect(genItemKey).toHaveBeenCalledTimes(items.length);
    expect(genItemKey).toHaveBeenNthCalledWith(1, items[0]);
    expect(genItemKey).toHaveBeenNthCalledWith(2, items[1]);
  });

  it("handles undefined values from genItemKey", () => {
    const items = ["one", "two"];
    const genItemKey = jest.fn(() => undefined);

    // Make sure it doesn't throw.
    render<string>({ genItemKey, items });

    expect(genItemKey).toHaveBeenCalledTimes(items.length);
  });
});
