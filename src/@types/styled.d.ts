import "styled-components";

import { SkeletonTheme } from "../theme";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends SkeletonTheme {}
}
