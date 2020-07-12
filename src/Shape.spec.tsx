import React from "react";
import { shallow } from "enzyme";

import { Shape } from ".";
import { Props as ShapeProps, Shell } from "./Shape";
import { RenderSkeleton } from "./utils/MaybeSkeleton";
import { getRenderedMaybeProp } from "./__tests__/helpers";

describe(__filename, () => {
  type RenderProps = Partial<ShapeProps>;

  function render({
    children = "Example content",
    ...moreProps
  }: RenderProps = {}) {
    const props = { children, ...moreProps };
    return shallow(<Shape {...props} />);
  }

  it("configures normal content", () => {
    const childrenClassName = "ContentClassName";
    const children = <span className={childrenClassName}>Example</span>;
    const className = "ExampleClass";
    const normalContent = getRenderedMaybeProp<JSX.Element>(
      render({ children, className }),
      "normalContent"
    );

    const normalRoot = shallow(<span>{normalContent}</span>);

    const shell = normalRoot.find(Shell);
    expect(shell).toHaveClassName(className);
    expect(shell.find(`.${childrenClassName}`)).toHaveLength(1);
  });

  it("configures renderSkeleton", () => {
    const childrenClassName = "ContentClassName";
    const children = <span className={childrenClassName}>Example</span>;
    const className = "ExampleClass";
    const renderSkeleton = getRenderedMaybeProp<RenderSkeleton>(
      render({ children, className }),
      "renderSkeleton"
    );

    const skel = shallow(<span>{renderSkeleton("Example content")}</span>);

    const shell = skel.find(Shell);
    expect(shell).toHaveClassName(className);
    // Make sure the children were not rendered as part of the skeleton.
    expect(shell.find(`.${childrenClassName}`)).not.toHaveLength(1);
  });
});
