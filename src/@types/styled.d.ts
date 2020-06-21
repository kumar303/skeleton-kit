import "styled-components";

import { SkeletonTheme } from "../theme";

declare module "styled-components" {
  export interface DefaultTheme extends SkeletonTheme {}
}
