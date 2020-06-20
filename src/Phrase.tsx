import * as React from "react";
import styled from "styled-components";

import InvisibleText from "./InvisibleText";
import Skeleton from "./Skeleton";

type Props = {
  children: string;
  className?: string;
  asSkeleton?: boolean;
};

export default function Phrase({
  asSkeleton = false,
  children,
  className,
}: Props) {
  if (!asSkeleton) {
    // TODO: think about the implications of not applying className here.
    return <>{children}</>;
  }
  return (
    <Skeleton className={className}>
      <InvisibleText>{children}</InvisibleText>
    </Skeleton>
  );
}
