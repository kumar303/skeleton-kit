import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { boolean, radios } from "@storybook/addon-knobs";

import { List, Phrase, RealText as Text, SkeletonGroup } from "../src";
import { Story, colors } from "./helpers/styles";

const Button = styled.button`
  width: 100%;
`;

const Nav = styled.aside`
  grid-area: L_nav;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled.li`
  border: 1px solid ${colors.darkBlue};
  padding: 1rem;
  width: 100%;

  &:not(:first-child) {
    border-top: none;
  }
`;

const NavArrow = styled.span<{ selected: boolean }>`
  display: flex;
  justify-content: flex-end;
  opacity: ${(props) => (props.selected ? "1" : "0")};
  transition: opacity 0.3s linear;
  width: 100%;
`;

const NavLink = styled.a`
  align-items: center;
  color: ${colors.darkBlue};
  display: flex;
  text-decoration: none;
  white-space: nowrap;
  width: 100%;

  &:hover ${NavArrow} {
    opacity: 0.5;
  }
`;

const Content = styled.section`
  grid-area: L_content;
  padding: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-areas:
    "L_header L_header"
    "L_nav L_content";
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 2fr;
  margin: 2rem;
  width: auto;

  @media (min-width: 900px) {
    margin-left: auto;
    margin-right: auto;
    width: 900px;
  }

  ${Button},
  ${NavLink},
  ${Content} {
    font-size: 1.6rem;
    line-height: 1.6;
  }
`;

const Header = styled.header`
  display: flex;
  grid-area: L_header;

  & :not(:last-child) {
    margin-right: 2rem;
  }
`;

const Title = styled.h2`
  border: 1px solid ${colors.darkPink};
  border-left: none;
  border-right: none;
  color: ${colors.darkPink};
  font-size: 3.5rem;
  font-weight: bold;
  line-height: 1.6;
  margin-bottom: 2rem;
  padding: 1rem 0;
`;

const data = [
  // First set:
  {
    "Danaus plexipus": `
        Milkweed butterflies are the most common of this type of butterfly
        and is found in what's termed the Old and New World tropics. Two
        exceptions are the monarch butterfly (q.v.) and the queen butterfly.
        Both live in temperate regions.
    `,
    Heliconians: `
        This is mainly a tropical butterfly family and can be found in Old
        World and New World tropic regions.
    `,
    "Common skippers": `
        These small to medium butterflies are part of the Superfamily
        Hesperioidea and populate the world. However, they mostly congregate
        in the tropics. Out of 3,500 species, there are 275 in North
        America. Many of these are concentrated in Texas and Arizona.
    `,
  },
  // Second set:
  {
    "Snout butterflies": `
        These butterflies are found all over the world but there aren't
        many species within this family.
    `,
    "Gossamer-winged": `
        There are over 5,000 species of this small to medium sized
        butterfly. They have several names such as hairstreaks, coppers,
        harvesters, blues, and metal marks. Most prefer tropical habitats;
        however, 145 species can be found in the United States.
    `,
  },
  // Third set:
  {
    "Giant skippers": `
        This North American family of skipper butterflies is known for being
        strong-flying. They are typically considered a subfamily of
        Hesperiidae.
    `,
    "Brush-footed": `
        This butterfly family has around 6,000 species divided into 12
        subfamilies and 40 tribes and found throughout the world in most
        habitats.
    `,
    Swallowtails: `
        There are around 550 species with the majority being swallowtail.
        Most of these are found in tropical regions as well as other
        regionals around the world except Antarctica.
    `,
    Parnassians: `
        They are in the alpine or arctic group and found in America's Rocky
        Mountains and Alaska.
    `,
  },
];

const LoadingTransitions: React.FunctionComponent<Record<
  string,
  unknown
>> = () => {
  const loadSpeed = parseFloat(
    radios(
      "Loading speed (seconds)",
      { "0.1": "0.1", "0.5": "0.5", "3": "3", "5": "5" },
      "3"
    )
  );

  const forceLoading = boolean("Show loading state", false);

  const initialDataIndex = -1;
  const initialContentKey = "";

  const [isLoading, setLoadingState] = useState<boolean>(true);
  const [isLoadingContent, setLoadingContentState] = useState<boolean>(true);
  const [dataIndex, setDataIndex] = useState<number>(initialDataIndex);
  const [contentKey, setContentKey] = useState<string>(initialContentKey);

  const loadNextSet = () => {
    setLoadingState(true);
    setTimeout(() => {
      let i = dataIndex + 1;
      if (i >= data.length) {
        i = 0;
      }
      setDataIndex(i);
      setContentKey(Object.keys(data[i])[0]);
      setLoadingState(false);
      setLoadingContentState(false);
    }, loadSpeed * 1000);
  };

  const loadContentKey = (key: string) => {
    setLoadingContentState(true);
    setTimeout(() => {
      setContentKey(key);
      setLoadingContentState(false);
    }, loadSpeed * 1000);
  };

  useEffect(() => {
    loadNextSet();
  }, [loadSpeed]);

  const seeInitial = () => {
    setDataIndex(initialDataIndex);
    setContentKey(initialContentKey);
    loadNextSet();
  };

  const info: { [key: string]: string | undefined } | undefined =
    dataIndex >= 0 ? data[dataIndex] : {};
  const content = info ? info[contentKey] : undefined;

  const showSkeletons = forceLoading || isLoading;

  return (
    <Story>
      <SkeletonGroup
        borderRadius="0.4rem"
        color={colors.darkBlue}
        showSkeletons={showSkeletons}
      >
        <Grid>
          <Header>
            <Button onClick={seeInitial}>See Initial Loading State</Button>
            <Button onClick={loadNextSet}>Load Next Set</Button>
          </Header>
          <Nav>
            <NavList>
              <List<string>
                genItemKey={(item) => {
                  return (
                    item &&
                    // In this case, the item is a key (the page title)
                    // and we know from our contrived dataset that
                    // it's unique.
                    item
                  );
                }}
                initialCount={4}
                items={Object.keys(info)}
                renderItem={({ item, isSkeleton }) => {
                  return (
                    <NavItem>
                      <NavLink
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          if (item) {
                            loadContentKey(item);
                          }
                        }}
                        href={
                          isSkeleton
                            ? // Disable the link while loading.
                              undefined
                            : "#"
                        }
                      >
                        <Phrase>{item}</Phrase>
                        <NavArrow selected={contentKey === item && !isSkeleton}>
                          &raquo;
                        </NavArrow>
                      </NavLink>
                    </NavItem>
                  );
                }}
              />
            </NavList>
          </Nav>
          <Content>
            <SkeletonGroup showSkeletons={showSkeletons || isLoadingContent}>
              <Title>
                <Phrase color={colors.darkPink}>{contentKey}</Phrase>
              </Title>
              <p>
                <Text color={colors.black}>{content}</Text>
              </p>
            </SkeletonGroup>
          </Content>
        </Grid>
      </SkeletonGroup>
    </Story>
  );
};

export default LoadingTransitions;
