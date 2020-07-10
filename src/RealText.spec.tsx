import React from "react";
import { mount, shallow } from "enzyme";

import { RealText } from ".";
import InvisibleText from "./InvisibleText";
import { Props as RealTextProps } from "./RealText";
import { SkeletonTheme, getAppliedTheme } from "./theme";
import MaybeSkeleton, { InitialContent } from "./utils/MaybeSkeleton";

describe(__filename, () => {
  type RenderProps = Partial<RealTextProps>;

  function getRenderProps({
    children = "Example text",
    showSkeletons = true,
    ...moreProps
  }: RenderProps = {}) {
    return { children, showSkeletons, ...moreProps };
  }

  function render(props: RenderProps = {}) {
    return mount(<RealText {...getRenderProps(props)} />);
  }

  function renderInitialContent({
    props = {},
    theme = {},
  }: { props?: RenderProps; theme?: Partial<SkeletonTheme> } = {}) {
    const root = shallow(<RealText {...getRenderProps(props)} />);
    const maybe = root.find(MaybeSkeleton);

    expect(maybe).toHaveLength(1);
    expect(maybe).toHaveProp("initialContent");

    const initialContent = maybe.prop("initialContent") as InitialContent;
    return initialContent(getAppliedTheme(theme));
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

  it("generates initial content using genSentence()", () => {
    const initialCharCount = 25;
    expect(renderInitialContent({ theme: { initialCharCount } })).toHaveLength(
      initialCharCount
    );
  });
});
