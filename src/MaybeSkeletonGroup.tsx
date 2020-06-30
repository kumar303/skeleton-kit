import React from "react";

import SkeletonGroup, { Props as SkeletonGroupProps } from "./SkeletonGroup";
import { ChildrenType } from "./utils/typeUtils";

export interface Props extends SkeletonGroupProps {
  children: ChildrenType;
}

export default function MaybeSkeletonGroup({ children, ...props }: Props) {
  // Only wrap children in <SkeletonGroup> if its props are defined.
  // This is an attempt to cut down on unneeded context providers.
  const Group = Object.keys(props).length ? SkeletonGroup : React.Fragment;
  return <Group {...props}>{children}</Group>;
}
