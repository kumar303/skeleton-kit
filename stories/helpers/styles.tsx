import React from "react";
import { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
// This is a polyfill that adds .focus-visible classes to mimic :focus-visible
import "focus-visible";

import { ChildrenType } from "../../src/utils/typeUtils";

// I just took an eye dropper and matched some Storybook colors to
// make it look consistent.
export const colors = {
  black: "#3c3c3c",
  darkBlue: "#1ea7fd",
  darkPink: "#ff4785",
  lightBlue: "#c0e4fc",
  lightPink: "#fb9fc1",
  lightGray: "#c5c7ca",
  lighterGray: "#e1e3e5",
  panelGray: "#f6f9fc",
  white: "#fff",
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: "kern", "liga", "dlig", "hlig";
  }

  body {
    background-color: ${colors.white};
    color: ${colors.black};
    margin: 1rem;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Courier, monospace;
  }

  em {
    font-style: italic;
  }

  button {
    background: ${colors.darkBlue};
    border: 1px solid ${colors.darkBlue};
    border-radius: 0.4rem;
    color: ${colors.white};
    cursor: pointer;
    font-size: 2rem;
    padding: 1rem;

    &:hover {
      background: ${colors.white};
      border-color: ${colors.darkBlue};
      color: ${colors.darkBlue};
    }

    &:active {
      transform: translateY(1px);
    }

    &:not(.focus-visible) {
      outline: none;
    }
  }

  a {
    color: ${colors.darkBlue};
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  code, div, ul, li, ol, p {
    font-size: 1.25rem;
  }
`;

type StoryProps = { children: ChildrenType };

export const Story: React.FunctionComponent<StoryProps> = ({ children }) => {
  return (
    <>
      <Reset />
      <GlobalStyle />
      {children}
    </>
  );
};
