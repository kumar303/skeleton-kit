import React from "react";
import { mount, shallow } from "enzyme";

import { BorderText, RealText } from ".";
import InvisibleText from "./InvisibleText";
import { Props as BorderTextProps } from "./BorderText";
import { RenderSkeleton } from "./utils/MaybeSkeleton";
import SkeletonGroup from "./SkeletonGroup";

describe(__filename, () => {
  function render({
    children = "Example text",
    showSkeletons = true,
    ...moreProps
  }: Partial<BorderTextProps> = {}) {
    const props = { children, showSkeletons, ...moreProps };
    return shallow(<BorderText {...props} />);
  }

  function simulateRenderSkeleton({
    content = "Example content",
    props = {},
  } = {}) {
    const root = render(props);
    const text = root.find(RealText);

    expect(text).toHaveProp("renderSkeleton");
    const renSkel = text.prop("renderSkeleton") as RenderSkeleton;
    return mount(<SkeletonGroup>{renSkel(content)}</SkeletonGroup>);
  }

  it("renders invisible text when showing skeletons", () => {
    const children = "Some text";
    const root = simulateRenderSkeleton({ content: children });

    expect(root.text()).toContain(children);
    expect(root.find(InvisibleText)).toHaveLength(1);
  });

  it("adds className when showing skeletons", () => {
    const className = "MyCoolClass";
    const root = simulateRenderSkeleton({ props: { className } });

    expect(root.find("span").find(`.${className}`)).toHaveLength(1);
  });
});
