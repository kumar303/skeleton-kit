import * as React from "react";
import styled from "styled-components";

interface Props {
  children: string;
  className?: string;
}

const Span = styled.span`
  visibility: hidden;
`;

export default function Text({ children, className }: Props) {
  // TODO: accessibility
  return <Span className={className}>{children}</Span>;
}
