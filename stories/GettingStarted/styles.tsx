import React from "react";
import styled from "styled-components";

import { colors } from "../helpers/styles";

export const Title = styled.h2`
  color: ${colors.darkBlue};
  font-size: 6rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const H3 = styled.h3`
  font-weight: bold;
  font-size: 1.75rem;
  margin-bottom: 1rem;
  padding-top: 1.5rem;
`;

export const P = styled.p`
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const WarnBlock = styled.div`
  border-radius: 0.4rem;
  background-color: ${colors.lightPink};
  font-weight: bold;
  padding: 1rem;
`;

export const Heading = styled.div`
  margin-bottom: 3rem;

  ${P} {
    color: ${colors.darkPink};
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
`;

export const LI = styled.li`
  display: flex;
  margin: 0 0 0.5rem 3rem;
`;

export const UL = styled(P).attrs({ as: "ul" })``;

export const Main = styled.main`
  @media (min-width: 900px) {
    margin: auto;
    width: 900px;
  }
`;

export const Emoji = styled.span`
  display: flex;
  justify-content: center;
  width: 3rem;
`;

const BulletShell = styled.div`
  align-items: center;
  display: flex;
  height: 2rem;
  justify-content: center;
`;

const StyledBullet = styled.div`
  background-color: ${colors.black};
  border-radius: 50%;
  height: 0.5rem;
  width: 0.5rem;
  margin: 1rem;
`;

export const Bullet: React.FC<Record<string, unknown>> = () => {
  return (
    <BulletShell>
      <StyledBullet />
    </BulletShell>
  );
};

export const BulletItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <LI>
      <Bullet />
      <span>{children}</span>
    </LI>
  );
};

export const EmojiItem: React.FC<{
  emoji: string;
  emojiAlt: string;
  text: React.ReactNode;
}> = ({ emoji, emojiAlt, text }) => {
  return (
    <LI>
      <Emoji role="img" aria-label={emojiAlt}>
        {emoji}️
      </Emoji>
      <span>{text}</span>
    </LI>
  );
};

export const ExampleGrid = styled(P).attrs({ as: "div" })`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr 3fr;
`;

export const ExampleLink = styled(P).attrs({ as: "div" })`
  align-items: center;
  background-color: ${colors.panelGray};
  display: flex;
  justify-content: flex-start;
  margin: 0;
  padding: 2rem;
`;

export const ExampleDef = styled(ExampleLink)`
  justify-content: flex-start;
`;
