import React from "react";
import { mount } from "enzyme";

import { InvisibleText, SkeletonGroup, Phrase } from ".";
import { SkeletonTheme } from "./theme";
import { Props as PhraseProps } from "./Phrase";

describe(__filename, () => {
  function render(theme: SkeletonTheme, props: PhraseProps) {
    return mount(
      <SkeletonGroup {...theme}>
        <Phrase {...props} />
      </SkeletonGroup>
    );
  }

  it("renders children when not showing skeletons", () => {
    const children = "Some text";
    const root = render({ showSkeletons: false }, { children });

    expect(root.text()).toEqual(children);
    expect(root.find(InvisibleText)).toHaveLength(0);
  });

  it("renders invisible text when showing skeletons", () => {
    const children = "Some text";
    const root = render({ showSkeletons: true }, { children });

    expect(root.text()).toEqual(children);
    expect(root.find(InvisibleText)).toHaveLength(1);
  });
});
