/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { mount, shallow } from "enzyme";

import { Text } from ".";
import InvisibleText from "./InvisibleText";
import { Props as TextProps } from "./Text";
import { SkeletonTheme, getAppliedTheme } from "./theme";
import { InitialContent, RenderNormalContent } from "./utils/MaybeSkeleton";
import { getRenderedMaybeProp } from "./__tests__/helpers";

describe(__filename, () => {
  type RenderProps = Partial<TextProps>;

  function getRenderProps({
    children = "Example text",
    showSkeletons = true,
    ...moreProps
  }: RenderProps = {}) {
    return { children, showSkeletons, ...moreProps };
  }

  function render(props: RenderProps = {}) {
    return mount(<Text {...getRenderProps(props)} />);
  }

  function shallowRender(props: RenderProps = {}) {
    return shallow(<Text {...getRenderProps(props)} />);
  }

  function renderInitialContent({
    props = {},
    theme = {},
  }: { props?: RenderProps; theme?: Partial<SkeletonTheme> } = {}) {
    const initialContent = getRenderedMaybeProp<InitialContent>(
      shallowRender(props),
      "initialContent"
    );
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

  it("adds className when rendering normal content", () => {
    const className = "MyCoolClass";
    const renderNormalContent = getRenderedMaybeProp<RenderNormalContent>(
      shallowRender({ className }),
      "renderNormalContent"
    );
    const root = shallow(<span>{renderNormalContent("Example content")}</span>);

    expect(root.find(`.${className}`)).toHaveLength(1);
  });

  it("generates initial content using genSentence()", () => {
    const initialCharCount = 25;
    expect(renderInitialContent({ theme: { initialCharCount } })).toHaveLength(
      initialCharCount
    );
  });

  it("can generate variable width initial content", () => {
    // Set this just to make sure our range overrides it.
    const initialCharCount = 500;
    const min = 20;
    const max = 25;
    const initialCharCountRange: [number, number] = [min, max];

    const content = renderInitialContent({
      theme: { initialCharCount, initialCharCountRange },
    });
    expect(content.length).toBeGreaterThanOrEqual(min);
    expect(content.length).toBeLessThanOrEqual(max);
  });

  it("cannot accept an initialCharCountRange with min higher than max", () => {
    const min = 30;
    const max = 20;
    const initialCharCountRange: [number, number] = [min, max];

    expect(() =>
      renderInitialContent({
        theme: { initialCharCountRange },
      })
    ).toThrow(/has a minimum value greater than the maximum value/);
  });

  it("cannot accept a non-array initialCharCountRange", () => {
    const initialCharCountRange = 12;

    expect(() =>
      renderInitialContent({
        theme: {
          // @ts-ignore: this type is intentionally wrong.
          initialCharCountRange,
        },
      })
    ).toThrow(/initialCharCountRange must be an array of two numbers/);
  });

  it("cannot accept an initialCharCountRange with missing values", () => {
    const initialCharCountRange = [12];

    expect(() =>
      renderInitialContent({
        theme: {
          // @ts-ignore: this type is intentionally wrong.
          initialCharCountRange,
        },
      })
    ).toThrow(/initialCharCountRange must be an array of two numbers/);
  });
});
