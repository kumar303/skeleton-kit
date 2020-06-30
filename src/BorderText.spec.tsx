import React from "react";
import { mount } from "enzyme";

import { BorderText, SkeletonGroup } from ".";
import InvisibleText from "./InvisibleText";
import { SkeletonTheme } from "./theme";
import { Props as BorderTextProps } from "./BorderText";

describe(__filename, () => {
  function render({
    children = "Example text",
    showSkeletons = true,
    ...moreProps
  }: SkeletonTheme & Partial<BorderTextProps> = {}) {
    const props = { children, showSkeletons, ...moreProps };
    const root = mount(
      <SkeletonGroup {...props}>
        <BorderText {...props} />
      </SkeletonGroup>
    );
    return root.find(BorderText);
  }

  it("renders invisible text when showing skeletons", () => {
    const children = "Some text";
    const root = render({ children });

    expect(root.text()).toContain(children);
    expect(root.find(InvisibleText)).toHaveLength(1);
  });

  it("adds className when showing skeletons", () => {
    const className = "MyCoolClass";
    const root = render({ className });

    expect(root.find("span").find(`.${className}`)).toHaveLength(1);
  });
});
