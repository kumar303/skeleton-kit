import styled from "styled-components";

import { Phrase } from "../../src";
import { colors } from "../helpers/styles";

export const Grid = styled.div<{ pLineHeight: string }>`
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

export const TextStrategy = styled.h2`
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

export const StrategyPill = styled.span`
  align-items: center;
  background-color: ${colors.darkPink};
  border-radius: 0.5rem;
  display: flex;
  padding: 1rem;

  & :first-child {
    margin-right: 2rem;
  }
`;

export const PillPhrase = styled(Phrase)`
  color: ${colors.white};
`;

export const StrategyHeader = styled(PillPhrase)`
  font-weight: bold;
`;
