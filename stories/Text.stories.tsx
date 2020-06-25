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
  // TODO: Move this, probably.
  html {
    font-size: 16px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: "kern", "liga", "dlig", "hlig";
  }

  em {
    font-style: italic;
  }

  * {
    box-sizing: border-box;
  }
`;

const Grid = styled.div<{ pLineHeight: string }>`
  * {
    color: #3c3c3c;
  }

  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  margin: 1rem;
  width: auto;

  @media (min-width: 1100px) {
    margin-left: auto;
    margin-right: auto;
    width: 1100px;
  }

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
    display: flex;
    font-size: 3rem;
    justify-content: center;
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
  && {
    border: none;
    display: flex;
    line-height: 1;
    margin-bottom: 1.5rem;
    padding: 0;
    width: auto;
    justify-content: center;
  }
`;

const StrategyPill = styled.span`
  align-items: center;
  background-color: #ff4785;
  border-radius: 0.5rem;
  display: flex;
  padding: 1rem;

  & :first-child {
    margin-right: 2rem;
  }
`;

const PillPhrase = styled(Phrase)`
  color: #fff;
`;

const StrategyHeader = styled(PillPhrase)`
  font-weight: bold;
`;

const textImpl = {
  realistic: RealText,
  simulated: SimulatedText,
  "border-hack": BorderText,
};

function renderStrategy(name: string) {
  return (
    <TextStrategy>
      <StrategyPill>
        <SkeletonGroup color="rgb(255, 255, 255, 0.5)">
          <StrategyHeader>Text strategy</StrategyHeader>
          <PillPhrase>{name}</PillPhrase>
        </SkeletonGroup>
      </StrategyPill>
    </TextStrategy>
  );
}

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
      {renderStrategy("realistic")}
      <p>
        <Text>
          Notice how the skeletons on the right mirror the layout. They preserve
          line-height, padding, and block height.
        </Text>
      </p>
      <p>
        <Text>
          The <em>realistic</em> strategy has some limitations, though. For
          example, you can adjust the line-height to see how the paragraph
          skeletons squish together as you approach numbers like 1.1.
        </Text>
      </p>
      {renderStrategy("simulated")}
      <p>
        <Text>
          Try switching to a simulated text strategy and a line-height of 1.1.
          This allows the skeleton line to be any height but, as you can see, it
          doesn't perfectly mirror the block height.
        </Text>
      </p>
      {renderStrategy("border-hack")}
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
        { "0.2rem": "0.2rem", "0.4rem": "0.4rem", none: "none" },
        "0.2rem"
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

LoadedVsLoading.story = {
  name: "Loaded vs. Loading",
};

export default {
  title: "Text",
  component: LoadedVsLoading,
};
