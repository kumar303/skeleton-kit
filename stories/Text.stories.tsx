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

const Grid = styled.div<{ pLineHeight: string }>`
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
    line-height: ${(props) => props.pLineHeight};
  }
`;

const TextStrategy = styled.h2`
  display: flex;
  justify-content: space-between;
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
        <Phrase>Loaded vs. Loading</Phrase>
      </h1>
      <TextStrategy>
        <Phrase>Text strategy</Phrase>
        <Phrase>realistic</Phrase>
      </TextStrategy>
      <p>
        <Text>
          Notice how the skeletons on the right mirror the layout. They preserve
          line-height, padding, and block height. This technique has some
          limitations, though. For example, you can adjust the line-height to
          see how the paragraph skeletons squish together as you approach
          numbers like 1.1.
        </Text>
      </p>
      <TextStrategy>
        <Phrase>Text strategy</Phrase>
        <Phrase>simulated</Phrase>
      </TextStrategy>
      <p>
        <Text>
          Try switching to a simulated text strategy and a line-height of 1.1.
          This allows the skeleton line to be any height but, as you can see, it
          doesn't perfectly mirror the block height.
        </Text>
      </p>
      <TextStrategy>
        <Phrase>Text strategy</Phrase>
        <Phrase>border-hack</Phrase>
      </TextStrategy>
      <p>
        <Text>
          This uses a border-top to render skeleton lines. It handles tight
          line-heights better but you can't use rounded corners with this
          implementation.
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
      <Grid pLineHeight={text("Paragraph line-height", "1.4")}>
        <div>{renderExample()}</div>
        <div>{renderExample({ asSkeleton: true })}</div>
      </Grid>
    </SkeletonGroup>
  );
}

export const LoadedVsLoading = () => <App />;

// Figure out how to type this:
// LoadedVsLoading.story {
//   name: 'Loaded vs. Loading'
// }

export default {
  title: "Text",
  component: LoadedVsLoading,
};

// export const Emoji = () => (
//   <Button>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );
