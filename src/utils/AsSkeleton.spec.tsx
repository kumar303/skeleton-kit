import React from "react";
import { mount } from "enzyme";

import { SkeletonGroup } from "../";
import AsSkeleton, { Props as AsSkeletonProps } from "./AsSkeleton";
import { SkeletonTheme } from "../theme";

describe(__filename, () => {
  function render({
    className = "ExampleClass",
    normalContent = "Example content",
    renderSkeleton = () => <span />,
    ...moreProps
  }: SkeletonTheme & Partial<AsSkeletonProps> = {}) {
    const props = { className, normalContent, renderSkeleton, ...moreProps };
    const root = mount(
      <SkeletonGroup {...props}>
        <AsSkeleton {...props} />
      </SkeletonGroup>
    );
    return root.find(AsSkeleton);
  }

  it("handles not showing skeletons", () => {
    const renderSkeleton = jest.fn();
    const normalContent = "Some content";
    const className = "MyCoolClass";
    const root = render({
      className,
      normalContent,
      renderSkeleton,
      showSkeletons: false,
    });

    expect(root.childAt(0)).toHaveClassName(className);
    expect(root.text()).toEqual(normalContent);
    expect(renderSkeleton).not.toHaveBeenCalled();
  });

  it("handles showing skeletons", () => {
    const innerClassName = "CustomClass";
    const renderSkeleton = jest.fn(() => <span className={innerClassName} />);
    const root = render({ renderSkeleton, showSkeletons: true });

    expect(root.childAt(0)).toHaveClassName(innerClassName);
    expect(renderSkeleton).toHaveBeenCalled();
  });
});
