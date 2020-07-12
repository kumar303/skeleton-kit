import { ShallowWrapper } from "enzyme";

import MaybeSkeleton from "../utils/MaybeSkeleton";

export function getRenderedMaybeProp<PropType>(
  root: ShallowWrapper,
  maybeProp: string
): PropType {
  const maybe = root.find(MaybeSkeleton);
  expect(maybe).toHaveLength(1);
  expect(maybe).toHaveProp(maybeProp);
  return maybe.prop(maybeProp);
}
