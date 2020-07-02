import React from "react";
import { shallow } from "enzyme";

import { Phrase, RealText } from ".";
import { Props as PhraseProps } from "./Phrase";

describe(__filename, () => {
  function render({
    children = "Example text",
    ...moreProps
  }: Partial<PhraseProps> = {}) {
    const props = { children, ...moreProps };
    return shallow(<Phrase {...props} />);
  }

  it("configures RealText", () => {
    const children = "Example of text content";
    const className = "MyCoolClass";
    // This is an example of a theme prop that should be passed along.
    const color = "rebeccapurple";
    const root = render({ className, children, color });

    const text = root.find(RealText);
    expect(text).toHaveProp("className", className);
    expect(text).toHaveProp("children", children);
    expect(text).toHaveProp("color", color);
  });
});
