import React from "react";
import { mount } from "enzyme";

import { BorderText, SkeletonGroup } from ".";
import { SkeletonTheme } from "./theme";
import { Props as BorderTextProps } from "./BorderText";

describe(__filename, () => {
  function render({
    children = "Example text",
    ...moreProps
  }: SkeletonTheme & Partial<BorderTextProps> = {}) {
    const props = { children, ...moreProps };
    const root = mount(
      <SkeletonGroup {...props}>
        <BorderText {...props} />
      </SkeletonGroup>
    );
    return root.find(BorderText);
  }

  it("adds a className when showing skeletons", () => {
    const className = "MyCoolClass";
    const root = render({ showSkeletons: true, className });

    expect(root.childAt(0)).toHaveClassName(className);
  });

  it("adds a className when not showing skeletons", () => {
    const className = "MyCoolClass";
    const root = render({ showSkeletons: false, className });

    expect(root.childAt(0)).toHaveClassName(className);
  });
});
