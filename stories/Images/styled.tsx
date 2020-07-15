import styled from "styled-components";

import { Shape } from "../../src";
import { colors } from "../helpers/styles";

export const Shell = styled.div`
  h1 {
    color: ${colors.darkBlue};
    font-size: 3rem;
    line-height: 1;
    margin-bottom: 2rem;
    text-align: center;
  }

  @media (min-width: 700px) {
    h1 {
      font-size: 5rem;
    }
  }

  p {
    font-size: 1.4rem;
    line-height: 1.4;
    margin-bottom: 1rem;
  }

  a {
    color: ${colors.black};
  }
`;

export const Content = styled.main`
  @media (min-width: 700px) {
    margin-left: auto;
    margin-right: auto;
    width: 700px;
  }
`;

export const Img = styled.img`
  height: 100%;
  width: auto;
`;

export const ShapeShell = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  float: right;
  margin: 0 0 1rem 1rem;
  width: 200px;
`;

export const StyledShape = styled(Shape)`
  height: 200px;
`;

export const ImageBy = styled.div`
  font-size: 0.9rem;
  margin-top: 1rem;
`;
