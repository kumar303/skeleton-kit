import React from "react";

export type ChildrenType = string | React.ReactNode;

type CompWithDefaults<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends React.FunctionComponent<any>,
  D extends Partial<React.ComponentProps<T>>
> = Pick<T, Exclude<keyof T, "defaultProps">> & // remove defaultProps
  (T extends (...a: infer A) => infer R ? (...a: A) => R : never) & {
    // keep signature
    defaultProps: D;
  }; // new defaults

/*
 * Returns a React.FunctionComponent with defaultProps.
 *
 * Example:
 *
 * type Props = { color: string };
 *
 * const defaultProps: Partial<Props> = { color: 'rebeccapurple' };
 *
 * const MyComponent = componentWithDefaults<Props>(
 *   ({ color }) => <span>{color}</span>,
 *   defaultProps
 * )
 *
 * This was swiped from https://github.com/microsoft/TypeScript/issues/27425#issuecomment-473848082
 *
 * TODO: see if TypeScript has better support for defaultProps by now.
 *
 * At the time of this writing, the only support (afaik) is to mark
 * any default prop as optional in the component's Props type. This solves
 * errors for the calling code but it requires implementation code to
 * be defensive against falsy values.
 */
export function componentWithDefaults<Props>() {
  return function applyDefaults<Defaults extends Partial<Props>>(
    comp: React.FunctionComponent<Props>,
    defaultProps: Defaults
  ): CompWithDefaults<React.FunctionComponent<Props>, Defaults> {
    // eslint-disable-next-line no-param-reassign
    comp.defaultProps = defaultProps;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return comp as any;
  };
}

export type StyleType = Record<string, unknown> | Record<string, unknown>[];
