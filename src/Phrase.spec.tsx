import React from "react";
import { mount } from "enzyme";

import { Phrase, SkeletonGroup } from ".";
import InvisibleText from "./InvisibleText";
import { SkeletonTheme } from "./theme";
import { Props as PhraseProps } from "./Phrase";

describe(__filename, () => {
  function render({
    children = "Example text",
    showSkeletons = true,
    ...moreProps
  }: SkeletonTheme & Partial<PhraseProps> = {}) {
    const props = { children, showSkeletons, ...moreProps };
    const root = mount(
      <SkeletonGroup {...props}>
        <Phrase {...props} />
      </SkeletonGroup>
    );
    return root.find(Phrase);
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

    expect(root.childAt(0)).toHaveClassName(className);
  });
});
