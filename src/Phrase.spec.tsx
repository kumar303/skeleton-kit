import React from "react";
import { mount } from "enzyme";

import { InvisibleText, Phrase, Skeleton, SkeletonGroup } from ".";
import { SkeletonTheme } from "./theme";
import { Props as PhraseProps } from "./Phrase";

describe(__filename, () => {
  function render({
    children = "Example text",
    ...moreProps
  }: SkeletonTheme & Partial<PhraseProps> = {}) {
    const props = { children, ...moreProps };
    const root = mount(
      <SkeletonGroup {...props}>
        <Phrase {...props} />
      </SkeletonGroup>
    );
    return root.find(Phrase);
  }

  it("renders children when not showing skeletons", () => {
    const children = "Some text";
    const root = render({ showSkeletons: false, children });

    expect(root.text()).toEqual(children);
    expect(root.find(InvisibleText)).toHaveLength(0);
  });

  it("adds className when not showing skeletons", () => {
    const className = "MyCoolClass";
    const root = render({ showSkeletons: false, className });

    expect(root.find("span")).toHaveClassName(className);
  });

  it("renders invisible text when showing skeletons", () => {
    const children = "Some text";
    const root = render({ showSkeletons: true, children });

    expect(root.text()).toEqual(children);
    expect(root.find(InvisibleText)).toHaveLength(1);
  });

  it("adds className when showing skeletons", () => {
    const className = "MyCoolClass";
    const root = render({ showSkeletons: true, className });

    expect(root.find(Skeleton)).toHaveClassName(className);
  });
});
