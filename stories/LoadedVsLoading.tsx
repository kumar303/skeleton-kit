import React from "react";
import styled from "styled-components";
import { radios, text } from "@storybook/addon-knobs";

import { Story, colors } from "./helpers/styles";

import {
  BorderText,
  Phrase,
  RealText,
  SkeletonGroup,
  SimulatedText,
} from "../src/";

const Grid = styled.div<{ pLineHeight: string }>`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
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
    border: 0.09rem dotted ${colors.lightPink};
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
  background-color: ${colors.darkPink};
  border-radius: 0.5rem;
  display: flex;
  padding: 1rem;

  & :first-child {
    margin-right: 2rem;
  }
`;

const PillPhrase = styled(Phrase)`
  color: ${colors.white};
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
        <SkeletonGroup color={colors.white}>
          <StrategyHeader>Text strategy</StrategyHeader>
          <PillPhrase>{name}</PillPhrase>
        </SkeletonGroup>
      </StrategyPill>
    </TextStrategy>
  );
}

function renderExample({ MaybeSkeleton = false } = {}) {
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
    <SkeletonGroup showSkeletons={MaybeSkeleton}>
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

function LoadedVsLoading() {
  return (
    <Story>
      <SkeletonGroup
        borderRadius={radios(
          "borderRadius",
          { "0.2rem": "0.2rem", "0.4rem": "0.4rem", none: "none" },
          "0.2rem"
        )}
        color={colors.black}
      >
        <Grid pLineHeight={text("Paragraph line-height", "1.4")}>
          <div>{renderExample()}</div>
          <div>{renderExample({ MaybeSkeleton: true })}</div>
        </Grid>
      </SkeletonGroup>
    </Story>
  );
}

LoadedVsLoading.story = {
  name: "Loaded vs. Loading",
};

export default LoadedVsLoading;
