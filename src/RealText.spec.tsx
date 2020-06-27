import React from "react";
import { mount } from "enzyme";

import { InvisibleText, RealText, SkeletonGroup } from ".";
import { SkeletonTheme } from "./theme";
import { Props as RealTextProps } from "./RealText";

describe(__filename, () => {
  function render({
    children = "Example text",
    showSkeletons = true,
    ...moreProps
  }: SkeletonTheme & Partial<RealTextProps> = {}) {
    const props = { children, showSkeletons, ...moreProps };
    const root = mount(
      <SkeletonGroup {...props}>
        <RealText {...props} />
      </SkeletonGroup>
    );
    return root.find(RealText);
  }

  it("renders invisible text when showing skeletons", () => {
    const children = "Some text";
    const root = render({ children });

    expect(root.text()).toEqual(children);
    expect(root.find(InvisibleText)).toHaveLength(1);
  });

  it("adds className when showing skeletons", () => {
    const className = "MyCoolClass";
    const root = render({ className });

    expect(root.childAt(0)).toHaveClassName(className);
  });
});
