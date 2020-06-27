import React from "react";
import { mount } from "enzyme";

import { InvisibleText } from ".";
import { Props as InvisibleTextProps } from "./InvisibleText";

describe(__filename, () => {
  function render({
    children = "Example text",
    ...moreProps
  }: Partial<InvisibleTextProps> = {}) {
    const props = { children, ...moreProps };
    return mount(<InvisibleText {...props} />);
  }

  it("adds a className", () => {
    const className = "MyCoolClass";
    const root = render({ className });

    expect(root.childAt(0)).toHaveClassName(className);
  });

  it("renders children", () => {
    const children = "Some text";
    const root = render({ children });

    expect(root.text()).toEqual(children);
  });
});
