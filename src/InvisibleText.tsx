import * as React from "react";
import styled from "styled-components";

import { ChildrenType } from "./utils/typeUtils";

const Hidden = styled.span`
  visibility: hidden;
`;

export interface Props {
  children: ChildrenType;
}

export default function InvisibleText({ children }: Props) {
  // For accessibility, alt text is rendered in <SkeletonGroup />
  return <Hidden aria-hidden="true">{children}</Hidden>;
}
