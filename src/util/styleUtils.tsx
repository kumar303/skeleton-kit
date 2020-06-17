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
    P extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    T extends object,
    O extends object = {}
  >(
    fn: ThemedStyledFunction<P, T, O>
  ): ThemedStyledFunction<P & ExtraProps, T, O & ExtraProps> =>
    (fn as unknown) as ThemedStyledFunction<P & ExtraProps, T, O & ExtraProps>;
}
