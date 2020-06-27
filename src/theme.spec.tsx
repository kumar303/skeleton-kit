import React from "react";
import { mount } from "enzyme";

import { useTheme } from "./theme";

describe(__filename, () => {
  describe("useTheme", () => {
    it("throws when forgetting to wrap in SkeletonGroup", () => {
      let error = new Error();

      function Component() {
        try {
          useTheme();
        } catch (thrownError) {
          error = thrownError;
        }
        return <span />;
      }

      mount(<Component />);

      expect(error.message).toMatch(
        /Did you wrap the components in <SkeletonGroup>/
      );
    });
  });
});
