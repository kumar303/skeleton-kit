import React from "react";
import { radios, text } from "@storybook/addon-knobs";

import { Story, colors } from "../helpers/styles";
import {
  Grid,
  PillPhrase,
  StrategyHeader,
  StrategyPill,
  TextStrategy,
} from "./styled";

import {
  BorderText,
  Phrase,
  Text as TextImpl,
  SkeletonGroup,
  SimulatedText,
} from "../../src";

const textImpl = {
  Text: TextImpl,
  SimulatedText,
  BorderText,
};

function renderStrategy(name: string) {
  return (
    <TextStrategy>
      <StrategyPill>
        <SkeletonGroup color={colors.white}>
          <StrategyHeader>Component</StrategyHeader>
          <PillPhrase>{name}</PillPhrase>
        </SkeletonGroup>
      </StrategyPill>
    </TextStrategy>
  );
}

function renderExample({ showSkeletons = false } = {}) {
  const Text =
    textImpl[
      radios(
        "Component",
        // Zip the keys into an options object.
        Object.keys(textImpl).reduce((a, k) => {
          return { ...a, [k]: k };
        }, {}),
        "Text"
      )
    ];
  return (
    <SkeletonGroup showSkeletons={showSkeletons}>
      <h1>
        <Phrase>Text Variants</Phrase>
      </h1>
      {renderStrategy("<Text>")}
      <p>
        <Text>
          Notice how the skeletons on the right mirror the layout. They preserve
          line-height, padding, and block height.
        </Text>
      </p>
      <p>
        <Text>
          This strategy has some limitations, though. For example, you can
          adjust the line-height to see how the paragraph skeletons squish
          together as you approach numbers like 1.1.
        </Text>
      </p>
      {renderStrategy("<SimulatedText>")}
      <p>
        <Text>
          Try switching to a simulated text strategy and a line-height of 1.1.
          This allows the skeleton line to be any height but, as you can see, it
          does not perfectly mirror the block height.
        </Text>
      </p>
      {renderStrategy("<BorderText>")}
      <p>
        <Text>
          This uses a border-top to render skeleton lines. It handles tight
          line-heights better but you can&lsquo;t use rounded corners with this
          implementation.
        </Text>
      </p>
    </SkeletonGroup>
  );
}

const TextStory: React.FunctionComponent<Record<string, unknown>> = () => {
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
          <div>{renderExample({ showSkeletons: true })}</div>
        </Grid>
      </SkeletonGroup>
    </Story>
  );
};

export default TextStory;
