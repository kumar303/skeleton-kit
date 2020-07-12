import React from "react";
import { mount } from "enzyme";

import { SkeletonGroup } from "..";
import MaybeSkeleton, { Props as MaybeSkeletonProps } from "./MaybeSkeleton";
import { SkeletonTheme } from "../theme";

describe(__filename, () => {
  function render(
    moreProps: Partial<SkeletonTheme> & Partial<MaybeSkeletonProps> = {}
  ) {
    const props = {
      className: "ExampleClass",
      initialContent: () => "Placeholder example",
      normalContent: "Example content",
      renderSkeleton: () => <span />,
      ...moreProps,
    };
    const root = mount(
      <SkeletonGroup {...props}>
        <MaybeSkeleton {...props} />
      </SkeletonGroup>
    );
    return root.find(MaybeSkeleton);
  }

  function renderWithSkeletons(props = {}) {
    return render({ showSkeletons: true, ...props });
  }

  it("handles not showing skeletons", () => {
    const renderSkeleton = jest.fn();
    const normalContent = "Some content";
    const root = render({
      normalContent,
      renderSkeleton,
      showSkeletons: false,
    });

    expect(root.text()).toEqual(normalContent);
    expect(renderSkeleton).not.toHaveBeenCalled();
  });

  it("handles showing skeletons with normal content", () => {
    const innerClassName = "CustomClass";

    const normalContent = "Example of real content";
    // This will be ignored when normalContent is defined.
    const initialContent = () => "This should not be rendered";

    const renderSkeleton = jest.fn(() => <span className={innerClassName} />);

    const root = renderWithSkeletons({
      initialContent,
      normalContent,
      renderSkeleton,
    });

    expect(root.childAt(0)).toHaveClassName(innerClassName);
    expect(renderSkeleton).toHaveBeenCalledWith(normalContent);
  });

  it("handles showing skeletons with initial content", () => {
    const color = "rebeccapurple";
    const innerClassName = "CustomClass";

    const renderSkeleton = jest.fn(() => <span className={innerClassName} />);

    const initialContent = jest.fn(() => "Example of placeholder content");

    const root = renderWithSkeletons({
      color,
      initialContent,
      normalContent: undefined,
      renderSkeleton,
    });

    expect(root.childAt(0)).toHaveClassName(innerClassName);
    expect(renderSkeleton).toHaveBeenCalledWith(initialContent());

    expect(initialContent).toHaveBeenCalledWith(
      // Make sure it received a theme object.
      expect.objectContaining({ color })
    );
  });
});
