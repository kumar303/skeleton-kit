import React from "react";
import { mount } from "enzyme";

import { SkeletonGroup } from ".";
import { AltText } from "./SkeletonGroup";
import { SkeletonTheme, useTheme } from "./theme";

function ThemeCatcher(props: { theme: SkeletonTheme }) {
  return <span />;
}

function ExampleComponent() {
  const theme = useTheme();
  return <ThemeCatcher theme={theme} />;
}

describe(__filename, () => {
  function catchTheme(jsx: JSX.Element) {
    const root = mount(jsx);
    const catcher = root.find(ThemeCatcher);
    expect(catcher).toHaveLength(1);
    return catcher.prop("theme");
  }

  it("defines a theme", () => {
    const color = "rebeccapurple";
    const borderRadius = "0.4rem";

    const theme = catchTheme(
      <SkeletonGroup borderRadius={borderRadius} color={color}>
        <ExampleComponent />
      </SkeletonGroup>
    );

    expect(theme.color).toEqual(color);
    expect(theme.borderRadius).toEqual(borderRadius);
  });

  it("merges nested themes", () => {
    const color = "rebeccapurple";
    const borderRadius = "0.4rem";

    const theme = catchTheme(
      <SkeletonGroup borderRadius={borderRadius}>
        <SkeletonGroup color={color}>
          <ExampleComponent />
        </SkeletonGroup>
      </SkeletonGroup>
    );

    expect(theme.color).toEqual(color);
    expect(theme.borderRadius).toEqual(borderRadius);
  });

  it("gives precedence to nearest group value", () => {
    const color = "rebeccapurple";

    const theme = catchTheme(
      <SkeletonGroup color="fuscia">
        <SkeletonGroup color={color}>
          <ExampleComponent />
        </SkeletonGroup>
      </SkeletonGroup>
    );

    expect(theme.color).toEqual(color);
  });

  it("renders alt text while showing skeletons", () => {
    const altText = "The content is still loading…";
    const root = mount(
      <SkeletonGroup showSkeletons altText={altText}>
        <span />
      </SkeletonGroup>
    );

    expect(root.find(AltText)).toHaveText(altText);
  });

  it("does not render alt text when not showing skeletons", () => {
    const altText = "The content is still loading…";
    const root = mount(
      <SkeletonGroup showSkeletons={false} altText={altText}>
        <span />
      </SkeletonGroup>
    );

    expect(root.find(AltText)).toHaveLength(0);
  });
});
