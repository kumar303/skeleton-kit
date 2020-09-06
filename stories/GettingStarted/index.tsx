import React, { useEffect, useState } from "react";
// TODO: Maybe this type isn't exported yet?
// @ts-ignore
import LinkTo from "@storybook/addon-links/react";

import { Phrase, Text, SkeletonGroup } from "../../src";
import { Story, colors } from "../helpers/styles";
import {
  DashedUL,
  EmojiItem,
  ExampleDef,
  ExampleGrid,
  ExampleLink,
  H3,
  Heading,
  LI,
  Main,
  P,
  Title,
  UL,
  WarnBlock,
} from "./styles";
import ListsExample from "../Examples-0-Lists.stories";
import ImagesExample from "../Examples-1-Images.stories";
// import TextExample from "../Examples-2-Text.stories";

const GettingStarted: React.FunctionComponent<Record<string, unknown>> = () => {
  const [isLoading, setLoadingState] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingState(false);
    }, 2000);
  });

  return (
    <Story>
      <SkeletonGroup borderRadius="0.4rem" showSkeletons={isLoading}>
        <Main>
          <Heading>
            <Title>
              <Phrase color={colors.darkBlue}>skeleton-kit</Phrase>
            </Title>
            <P>
              <Text color={colors.darkPink}>
                Low maintenance, pixel perfect skeleton screens
              </Text>
            </P>
          </Heading>
          <P>
            The{" "}
            <a href="http://farmdev.com/thoughts/108/the-art-of-ui-skeletons/">
              skeleton screen technique
            </a>{" "}
            is when you render placeholder elements before data has loaded.
            Unlike a spinner, it feels fast, transitions are less jarring, and
            you can render more UI details while loading.
          </P>
          <P>
            This library helps you build robust skeleton screens in{" "}
            <a href="https://reactjs.org/">React</a>.
          </P>
          <H3>Goals</H3>
          <UL>
            <EmojiItem
              emoji="💅"
              emojiAlt="nail polish"
              text="Fit into pixel perfect design systems"
            />
            <EmojiItem
              emoji="✨"
              emojiAlt="sparkles"
              text="Automatically adapt to real layouts"
            />
            <EmojiItem
              emoji="👻️"
              emojiAlt="ghost"
              text="No maintenance burden, always in sync"
            />
            <EmojiItem
              emoji="🙏️"
              emojiAlt="thank you"
              text="Easily work with lists of unknown lengths"
            />
            <EmojiItem
              emoji="👏"
              emojiAlt="clapping hands"
              text={
                <>
                  Built to last:{" "}
                  <a href="https://www.typescriptlang.org/">TypeScript</a>,{" "}
                  <a href="https://reactjs.org/docs/hooks-intro.html">
                    React hooks
                  </a>
                  , accessibility, tests
                </>
              }
            />
          </UL>
          <H3>Installation</H3>
          <P>
            <WarnBlock>
              This library is in preview mode as the interface evolves rapidly.
              Please file an issue before submitting a pull request. Thanks for
              your interest!
            </WarnBlock>
          </P>
          <H3>Examples</H3>
          <ExampleGrid>
            <ExampleLink>
              <LinkTo kind={ListsExample.title}>Lists</LinkTo>
            </ExampleLink>
            <ExampleDef>
              Work with common layouts, including lists of unknown lengths
            </ExampleDef>
            <ExampleLink>
              <LinkTo kind={ImagesExample.title}>Images</LinkTo>
            </ExampleLink>
            <ExampleDef>Add square or circular image placeholders</ExampleDef>
            {/* <ExampleLink>
              <LinkTo kind={TextExample.title}>Text</LinkTo>
            </ExampleLink>
            <ExampleDef>
              Compare alternate strategies for replacing text
            </ExampleDef> */}
          </ExampleGrid>
          <H3>TODO</H3>
          <DashedUL>
            <LI>Add interface documentation</LI>
            <LI>Support React Native</LI>
            <LI>Make the interface a little less verbose</LI>
            <LI>Make sure virtual lists are well supported</LI>
            <LI>Use local storage to make initial skeletons nicer</LI>
          </DashedUL>
          <H3>Alternatives</H3>
          <P>
            Most alternative skeleton libraries require the developer to design
            and maintain separate skeleton layouts which can easily get out of
            sync. However, here are a few libraries that share similar goals
            with <code>skeleton-kit</code>:
          </P>
          <DashedUL>
            <LI>
              <span>
                <a href="https://github.com/alexZajac/react-native-skeleton-content">
                  react-native-skeleton-content
                </a>{" "}
                is a React Native libary that adapts to layouts in a similar
                manner
              </span>
            </LI>
            <LI>
              <span>
                <a href="https://github.com/dvtng/react-loading-skeleton">
                  react-loading-skeleton
                </a>{" "}
                automatically adapts to web layouts but is limited in what it
                can do
              </span>
            </LI>
          </DashedUL>
        </Main>
      </SkeletonGroup>
    </Story>
  );
};

export default GettingStarted;
