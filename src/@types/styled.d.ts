import "styled-components";

import { GlobalTheme } from "../theme";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends GlobalTheme {}
}
