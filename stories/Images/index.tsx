import React, { useEffect, useState } from "react";
import { radios } from "@storybook/addon-knobs";

import { Phrase, SkeletonGroup, Text } from "../../src";
import { Story, colors } from "../helpers/styles";
import { getLoadSpeed, getForcedLoading } from "../helpers/knobs";
import {
  Content,
  ImageBy,
  ShapeShell,
  Shell,
  Img,
  StyledShape,
} from "./styled";
// @ts-ignore: TODO: figure out image imports
import gossamerImageSrc from "./images/gossamer.jpg";

const Images: React.FunctionComponent<Record<string, unknown>> = () => {
  const shapeKind = radios(
    "Image shape",
    { box: "box", circle: "circle" },
    "circle"
  );

  const forceLoading = getForcedLoading();
  const loadSpeed = getLoadSpeed();

  const [isLoading, setLoadingState] = useState<boolean>(true);

  useEffect(() => {
    setLoadingState(true);
    setTimeout(() => {
      setLoadingState(false);
    }, loadSpeed * 1000);
  }, [loadSpeed, shapeKind]);

  return (
    <Story>
      <SkeletonGroup
        borderRadius="0.4rem"
        showSkeletons={forceLoading || isLoading}
      >
        <Shell>
          <h1>
            <Phrase color={colors.darkBlue}>Gossamer-winged Butterfly</Phrase>
          </h1>
          <Content>
            <ShapeShell>
              <StyledShape
                // Use a dominant color from the image.
                color="#557136"
                kind={shapeKind}
                heightStyle="100%"
                widthStyle="100%"
              >
                <Img src={gossamerImageSrc} />
              </StyledShape>
              <ImageBy>
                <Phrase color={colors.black}>
                  <a href="https://inaturalist.ca/photos/1970631">
                    CC BY-NC Paul Cools
                  </a>
                </Phrase>
              </ImageBy>
            </ShapeShell>
            <SkeletonGroup color={colors.black}>
              <p>
                <Text>
                  Gossamer-winged butterfly, (family Lycaenidae), any of a group
                  of small, often brightly coloured butterflies (order
                  Lepidoptera) that includes several hundred species commonly
                  called coppers, blues, hairstreaks, harvesters, and metal
                  marks.
                </Text>
              </p>
              <p>
                <Text>
                  All are small to medium-sized butterflies (wingspan 1–3 cm
                  [0.4–1.2 inches]) that are agile and delicate. In males the
                  upper-wing surfaces are usually brightly coloured and
                  iridescent. The underwing patterns of both sexes are spotted
                  or streaked and often have false eye-markings and trailing
                  filaments on the hind wings that serve as decoys for
                  predators.
                </Text>
              </p>
              <p>
                <Text>
                  Their food plants include trees, shrubs, and annual legumes.
                  The larvae of some species are carnivorous and may require a
                  diet of aphids or ant larvae. The latter may be devoured while
                  adult ants take secretions from special so-called milk glands
                  on the butterfly larva.
                </Text>
              </p>
            </SkeletonGroup>
          </Content>
        </Shell>
      </SkeletonGroup>
    </Story>
  );
};

export default Images;
