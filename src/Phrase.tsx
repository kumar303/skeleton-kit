import * as React from "react";
import styled from "styled-components";

import Skeleton from "./Skeleton";

type Props = {
  children: string;
  asSkeleton?: boolean;
};

const Shell = styled.span``;

const Inner = styled.span`
  visibility: hidden;
`;

export default function Phrase({ asSkeleton = false, children }: Props) {
  if (!asSkeleton) {
    return <>{children}</>;
  }
  return (
    <Shell>
      <Skeleton>
        <Inner>{children}</Inner>
      </Skeleton>
    </Shell>
  );
}
