import * as React from "react";
import styled from "styled-components";

import { ChildrenType } from "./utils/typeUtils";

export interface Props {
  children: ChildrenType;
  className?: string;
}

const Span = styled.span`
  visibility: hidden;
`;

export default function Text({ children, className }: Props) {
  // TODO: accessibility
  return <Span className={className}>{children}</Span>;
}
