import styled from "styled-components";

import { colors } from "../helpers/styles";

export const contentWidth = 300;

export const CtrlButton = styled.button`
  margin-bottom: 1rem;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;

  @media (min-width: ${contentWidth}px) {
    margin-left: auto;
    margin-right: auto;
    width: ${contentWidth}px;
  }
`;

export const StyledList = styled.div`
  border: 1px solid ${colors.black};
`;

export const StyledItem = styled.div<{ altBg: boolean }>`
  align-items: center;
  background-color: ${(props) =>
    props.altBg ? colors.panelGray : colors.lighterGray};
  color: ${colors.black};
  display: flex;
  font-size: 1rem;
  padding: 1rem;
`;
