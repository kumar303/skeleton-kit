import React from "react";
import { mount } from "enzyme";

import { SkeletonGroup } from ".";
import { SkeletonTheme } from "./theme";
import InvisibleText, {
  AltText,
  Props as InvisibleTextProps,
} from "./InvisibleText";

describe(__filename, () => {
  function render({
    children = "Example text",
    ...moreProps
  }: SkeletonTheme & Partial<InvisibleTextProps> = {}) {
    const props = { children, ...moreProps };
    return mount(
      <SkeletonGroup {...props}>
        <InvisibleText {...props} />
      </SkeletonGroup>
    );
  }

  it("renders children", () => {
    const children = "Some text";
    const root = render({ children });

    expect(root.text()).toContain(children);
  });

  it("renders alt text", () => {
    const altText = "The content is still loading…";
    const root = render({ altText });

    expect(root.find(AltText)).toHaveText(altText);
  });
});
