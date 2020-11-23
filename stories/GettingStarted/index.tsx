import React, { useEffect, useState } from "react";
// TODO: Maybe this type isn't exported yet?
// @ts-ignore
import LinkTo from "@storybook/addon-links/react";

import { Phrase, Text, SkeletonGroup } from "../../src";
import { Story, colors } from "../helpers/styles";
import {
  CodeBlock,
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
import VirtualListsExample from "../Examples-1-VirtualLists.stories";
import ImagesExample from "../Examples-2-Images.stories";
// import TextExample from "../Examples-3-Text.stories";

const GettingStarted: React.FunctionComponent<Record<string, unknown>> = () => {
  const [isLoading, setLoadingState] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingState(false);
    }, 2000);
  });

  const installDeps = "skeleton-kit react react-dom styled-components";

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
              This library is currently experimental while we prove out some
              concepts. All breaking changes will follow{" "}
              <a href="https://semver.org/">semver</a> conventions.
            </WarnBlock>
            <P>
              Install <code>skeleton-kit</code> and its peer dependencies:
            </P>
            <P>
              <CodeBlock>npm install --save {installDeps}</CodeBlock>
            </P>
            <P>or</P>
            <P>
              <CodeBlock>yarn add {installDeps}</CodeBlock>
            </P>
            <P>
              While{" "}
              <a href="https://styled-components.com/">styled-components</a>{" "}
              doesn&apos;t require a build step, you may want to research their{" "}
              <a href="https://styled-components.com/docs/tooling#babel-plugin">
                Babel plugin
              </a>{" "}
              which adds some optimizations.
            </P>
          </P>
          <H3>Examples</H3>
          <ExampleGrid>
            <ExampleLink>
              <LinkTo kind={ListsExample.title}>Lists</LinkTo>
            </ExampleLink>
            <ExampleDef>
              Work with common layouts, including basic text and lists of
              unknown lengths
            </ExampleDef>
            <ExampleLink>
              <LinkTo kind={VirtualListsExample.title}>Virtual Lists</LinkTo>
            </ExampleLink>
            <ExampleDef>
              Work with virtual list patterns such as infinite loading
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
          <H3>TODO / ideas</H3>
          <DashedUL>
            <LI>
              Fix remaining performance issues (
              <a href="https://github.com/kumar303/skeleton-kit/issues/21">
                #21
              </a>
              )
            </LI>
            <LI>Add interface documentation (forthcoming when stable)</LI>
            <LI>Make the interface a little less verbose</LI>
            <LI>
              Recall stored state to make initial skeletons nicer (
              <a href="https://github.com/kumar303/skeleton-kit/issues/10">
                #10
              </a>
              )
            </LI>
            <LI>
              Maybe support React Native (
              <a href="https://github.com/kumar303/skeleton-kit/issues/9">#9</a>
              )
            </LI>
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
          <H3>Your own skeletons are out of sync</H3>
          <P>
            Yep, the skeletons for the navigation on this page do not match the
            final layout. Thanks for noticing. These are implemented deep within{" "}
            <a href="https://storybook.js.org/">Storybook</a> and I haven&apos;t
            looked to see if they&apos;re customizable yet 😅.
          </P>
          <P>
            See?! Everyone has a hard time implementing skeleton screens. Even{" "}
            <a href="https://www.youtube.com/">YouTube</a> is off by about 2
            pixels at the time of this writing.
          </P>
        </Main>
      </SkeletonGroup>
    </Story>
  );
};

export default GettingStarted;
