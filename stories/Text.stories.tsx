import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import { radios, text, boolean, number } from "@storybook/addon-knobs";

import {
  Phrase,
  SkeletonGroup,
  RealText,
  SimulatedText,
  BorderText,
} from "../src/";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }
`;

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
  }

  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto auto;
  margin: 1rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    border: 0.09rem dotted #fb9fc1;
    margin-bottom: 1rem;
    padding: 1rem;
  }

  h1 {
    font-size: 4rem;
    line-height: 1.4;
    margin: 0 0 1.5rem;
  }

  h2 {
    font-size: 1.8rem;
    line-height: 1.2;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.4;
  }
`;

const textImpl = {
  realistic: RealText,
  simulated: SimulatedText,
  "border-hack": BorderText,
};

function renderExample({ asSkeleton = false } = {}) {
  const Text =
    textImpl[
      radios(
        "Text strategy",
        // Zip the keys into an options object.
        Object.keys(textImpl).reduce((a, k) => {
          return { ...a, [k]: k };
        }, {}),
        "realistic"
      )
    ];
  return (
    <SkeletonGroup showSkeletons={asSkeleton}>
      <h1>
        <Phrase>This is a headline</Phrase>
      </h1>
      <h2>
        <Phrase>Something else secondary</Phrase>
      </h2>
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
    <SkeletonGroup
      borderRadius={radios(
        "borderRadius",
        { none: "none", "0.4rem": "0.4rem" },
        "none"
      )}
      color="#c0e4fc"
    >
      <Reset />
      <GlobalStyle />
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
