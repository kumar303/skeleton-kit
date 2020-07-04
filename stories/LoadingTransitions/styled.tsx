import styled from "styled-components";

import { colors } from "../helpers/styles";

export const Button = styled.button`
  width: 100%;
`;

export const Nav = styled.nav`
  grid-area: L_nav;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const NavArrow = styled.span<{ selected: boolean }>`
  display: flex;
  justify-content: flex-end;
  opacity: ${(props) => (props.selected ? "1" : "0")};
  transition: opacity 0.3s linear;
  width: 100%;
`;

export const NavLink = styled.a`
  text-decoration: none;

  &:hover ${NavArrow} {
    opacity: 0.5;
  }
`;

export const EmptyNav = styled.span`
  justify-content: center;
  padding-top: 4rem;
  padding-bottom: 4rem;
`;

export const NavItem = styled.li`
  border: 1px solid ${colors.darkBlue};
  padding: 1rem;
  width: 100%;

  &:not(:first-child) {
    border-top: none;
  }

  ${NavLink},
  ${EmptyNav} {
    align-items: center;
    color: ${colors.darkBlue};
    display: flex;
    white-space: nowrap;
    width: 100%;
  }
`;

export const Content = styled.section`
  grid-area: L_content;
  padding: 0;
`;

const gridRows = (rows: string[]) => rows.map((r) => `"${r}"`).join(" ");

interface GridProps {
  isEmpty: boolean;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-gap: 2rem;
  grid-template-areas: ${(props) => {
    if (props.isEmpty) {
      return gridRows(["L_header L_header L_header", "L_nav L_nav L_nav"]);
    }
    return gridRows([
      "L_header L_header L_header",
      "L_nav L_content L_content",
    ]);
  }};
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 2rem;
  width: auto;

  ${Button},
  ${NavLink},
  ${EmptyNav},
  ${Content} {
    font-size: 1.2rem;
    line-height: 1.6;
  }

  @media (min-width: 900px) {
    margin-left: auto;
    margin-right: auto;
    width: 900px;

    ${Button},
    ${NavLink},
    ${EmptyNav},
    ${Content} {
      font-size: 1.6rem;
      line-height: 1.6;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  grid-area: L_header;
  justify-content: space-evenly;

  & :not(:last-child) {
    margin-right: 2rem;
  }
`;

export const Title = styled.h2`
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
