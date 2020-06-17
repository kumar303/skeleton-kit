import * as React from "react";
import styled from "styled-components";

type Props = {
  children: string;
};

const Span = styled.span`
  visibility: hidden;
`;

export default function Text({ children }: Props) {
  // TODO: accessibility
  return <Span>{children}</Span>;
}
