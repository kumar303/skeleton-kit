import { ThemedStyledFunction } from "styled-components";

// This beaute lets you add extra style props in a safe way.
//
// Example:
//
// const Div = addStyleProps<{ height: number }>()(styled.div)`
//   height: ${(props) => props.height};
// `;
//
// https://github.com/styled-components/styled-components/issues/630#issuecomment-473901594
export function addStyleProps<ExtraProps>() {
  return <
    Cmp extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    Theme extends object,
    Opt extends object = {}
  >(
    fn: ThemedStyledFunction<Cmp, Theme, Opt>
  ): ThemedStyledFunction<Cmp & ExtraProps, Theme, Opt & ExtraProps> =>
    (fn as unknown) as ThemedStyledFunction<
      Cmp & ExtraProps,
      Theme,
      Opt & ExtraProps
    >;
}
