import React from "react";
import { mount } from "enzyme";

import { SimulatedText } from ".";
import InvisibleText from "./InvisibleText";
import { Props as SimulatedTextProps } from "./SimulatedText";

describe(__filename, () => {
  function render({
    children = "Example text",
    showSkeletons = true,
    ...moreProps
  }: Partial<SimulatedTextProps> = {}) {
    const props = { children, showSkeletons, ...moreProps };
    const root = mount(<SimulatedText {...props} />);
    return root.find(SimulatedText);
  }

  it("adds a className when showing skeletons", () => {
    const className = "MyCoolClass";
    const root = render({ className });

    expect(root.find("span").find(`.${className}`)).toHaveLength(1);
  });

  it("renders children when showing skeletons", () => {
    const children = "Some text";
    const root = render({ children });

    expect(root.text()).toContain(children);
    expect(root.find(InvisibleText)).toHaveLength(1);
  });
});
