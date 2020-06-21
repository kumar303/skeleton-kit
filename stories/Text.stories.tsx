import React from "react";
import styled from "styled-components";

import {
  Phrase,
  SkeletonGroup,
  RealText as Text,
  // SimulatedText as Text,
  // BorderText as Text,
} from "../src/";

const Grid = styled.div`
  // TODO: Move this, probably.
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  -moz-font-feature-settings: "kern=1", "liga=1", "dlig=1", "hlig=1";
  -moz-font-feature-settings: "kern" on, "liga" on, "dlig" on, "hlig" on;
  -webkit-font-feature-settings: "kern", "liga", "dlig", "hlig";
  -ms-font-feature-settings: "kern", "liga", "dlig", "hlig";
  font-feature-settings: "kern", "liga", "dlig", "hlig";

  * {
    box-sizing: border-box;
    color: #3c3c3c;
    margin: 0;
    padding: 0;
  }

  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: auto auto;

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    border: 1px dotted #fb9fc1;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }

  h1 {
    line-height: 1.5;
    margin: 0 0 1.5rem;
  }

  p {
    line-height: 1.3;
  }
`;

function renderExample({ asSkeleton = false } = {}) {
  return (
    <SkeletonGroup showSkeletons={asSkeleton}>
      <h1>
        <Phrase>This is a headline</Phrase>
      </h1>
      <h3>
        <Phrase>Something else secondary</Phrase>
      </h3>
      <p>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ex
          felis, ullamcorper at interdum vel, auctor ac magna. Donec non rutrum
          mi. Quisque quis tellus fermentum, pretium est sed, accumsan purus.
        </Text>
      </p>
      <p>
        <Text>
          Nulla purus massa, scelerisque in tellus cursus, scelerisque feugiat
          eros. Aenean ut urna sit amet orci luctus vestibulum. Vivamus libero
          dolor, varius eu volutpat et, tempus vel tortor. Praesent ut tortor
          turpis.
        </Text>
      </p>
      <p>
        <Text>
          Morbi sit amet arcu ac felis sollicitudin malesuada. Mauris non
          laoreet enim. Integer tortor quam, dapibus non laoreet et, tincidunt
          sed odio.
        </Text>
      </p>
    </SkeletonGroup>
  );
}

function App() {
  return (
    <SkeletonGroup skeletonBorderRadius="0.4rem" skeletonColor="#c0e4fc">
      <Grid>
        <div>{renderExample()}</div>
        <div>{renderExample({ asSkeleton: true })}</div>
      </Grid>
    </SkeletonGroup>
  );
}

export default {
  title: "Text",
  component: App,
};

export const HeadlineWithText = () => <App />;

// export const Emoji = () => (
//   <Button>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );
