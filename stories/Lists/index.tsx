import React, { useEffect, useState } from "react";

import { List, Phrase, Text, SkeletonGroup } from "../../src";
import { Story, colors } from "../helpers/styles";
import { getLoadSpeed, getForcedLoading } from "../helpers/knobs";
import { data } from "../helpers/butterflyData";
import {
  Button,
  Content,
  EmptyNav,
  Grid,
  Header,
  Nav,
  NavArrow,
  NavItem,
  NavLink,
  NavList,
  Title,
} from "./styled";

const ListsStory: React.FunctionComponent<Record<string, unknown>> = () => {
  const forceLoading = getForcedLoading();
  const loadSpeed = getLoadSpeed();

  const initialDataIndex = -1;
  const initialContentKey = "";

  const [isLoading, setLoadingState] = useState<boolean>(true);
  const [isLoadingContent, setLoadingContentState] = useState<boolean>(true);
  const [dataIndex, setDataIndex] = useState<number>(initialDataIndex);
  const [contentKey, setContentKey] = useState<string>(initialContentKey);

  const resetState = () => {
    setDataIndex(initialDataIndex);
    setContentKey(initialContentKey);
  };

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

  const loadEmptySet = () => {
    setLoadingState(true);
    setTimeout(() => {
      resetState();
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
    resetState();
    loadNextSet();
  };

  const info: { [key: string]: string | undefined } | undefined =
    dataIndex >= 0 ? data[dataIndex] : {};
  const copy = info ? info[contentKey] : undefined;

  const showSkeletons = forceLoading || isLoading;
  const showContentSkeleton = showSkeletons || isLoadingContent;

  return (
    <Story>
      <SkeletonGroup
        borderRadius="0.4rem"
        color={colors.darkBlue}
        showSkeletons={showSkeletons}
      >
        <List<string>
          genItemKey={(item) => {
            return (
              item &&
              // In this case, item is the the page title and we
              // know from our contrived dataset that it's unique.
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
          renderAll={({ renderedItems, hasZeroItems }) => {
            return (
              <Grid isEmpty={hasZeroItems}>
                <Header>
                  <Button onClick={seeInitial}>See Initial State</Button>
                  <Button onClick={loadNextSet}>Change Set</Button>
                  <Button onClick={loadEmptySet}>Load Empty Set</Button>
                </Header>
                <Nav>
                  <NavList>
                    {hasZeroItems ? (
                      <NavItem>
                        <EmptyNav>No results</EmptyNav>
                      </NavItem>
                    ) : (
                      renderedItems
                    )}
                  </NavList>
                </Nav>
                {!hasZeroItems && (
                  <Content>
                    <SkeletonGroup showSkeletons={showContentSkeleton}>
                      <Title>
                        <Phrase color={colors.darkPink}>{contentKey}</Phrase>
                      </Title>
                      <p>
                        <Text color={colors.black}>{copy}</Text>
                      </p>
                    </SkeletonGroup>
                  </Content>
                )}
              </Grid>
            );
          }}
        />
      </SkeletonGroup>
    </Story>
  );
};

export default ListsStory;
