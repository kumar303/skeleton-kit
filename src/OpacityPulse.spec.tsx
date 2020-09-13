import React from "react";
import { mount, shallow } from "enzyme";

import { SkeletonGroup } from ".";
import OpacityPulse from "./OpacityPulse";

describe(__filename, () => {
  it("throws if min is greater than max", () => {
    let caught = new Error("No error was caught");

    type Props = Record<string, unknown>;

    // TODO: figure out how to hide error logging.
    // https://github.com/facebook/react/issues/15069
    class Catcher extends React.Component<Props, { hasError: boolean }> {
      constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
      }

      componentDidCatch(error: Error) {
        caught = error;
      }

      static getDerivedStateFromError() {
        return { hasError: true };
      }

      render() {
        const { children } = this.props;
        const { hasError } = this.state;
        if (!hasError) {
          return children;
        }
        return null;
      }
    }

    mount(
      <Catcher>
        <SkeletonGroup loopDurationMaxSec={1} loopDurationMinSec={2}>
          <OpacityPulse />
        </SkeletonGroup>
      </Catcher>
    );

    expect(caught.message).toEqual(
      "loopDurationMinSec (2) cannot be greater than loopDurationMax (1)"
    );
  });

  it("accepts a style prop", () => {
    const style = { color: "rebeccapurple" };
    expect(
      shallow(
        <SkeletonGroup>
          <OpacityPulse style={style} />
        </SkeletonGroup>
      ).find(OpacityPulse)
    ).toHaveProp("style", style);
  });
});
