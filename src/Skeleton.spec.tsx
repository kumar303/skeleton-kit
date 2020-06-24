import React from "react";
import { mount } from "enzyme";

import { Skeleton, SkeletonGroup } from ".";
import { SkeletonTheme } from "./theme";
import { Props as SkeletonProps } from "./Skeleton";

describe(__filename, () => {
  function render(props: SkeletonTheme & Partial<SkeletonProps> = {}) {
    const root = mount(
      <SkeletonGroup {...props}>
        <Skeleton {...props} />
      </SkeletonGroup>
    );
    return root.find(Skeleton);
  }

  it("adds a className", () => {
    const className = "MyCoolClass";
    const root = render({ className });

    expect(root.find("span")).toHaveClassName(className);
  });

  it("lets you change the color", () => {
    const color = "rebeccapurple";
    const root = render({ color });

    expect(root).toHaveStyleRule("background-color", color);
  });

  it("lets you change the borderRadius", () => {
    const borderRadius = "0.4rem";
    const root = render({ borderRadius });

    expect(root).toHaveStyleRule("border-radius", borderRadius);
  });
});
