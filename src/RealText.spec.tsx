import React from "react";
import { mount } from "enzyme";

import { RealText } from ".";
import InvisibleText from "./InvisibleText";
import { Props as RealTextProps } from "./RealText";

describe(__filename, () => {
  function render({
    children = "Example text",
    showSkeletons = true,
    ...moreProps
  }: Partial<RealTextProps> = {}) {
    const props = { children, showSkeletons, ...moreProps };
    const root = mount(<RealText {...props} />);
    return root.find(RealText);
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
