export interface Input<T> {
  a: T;
}
export type Component<T> = Marko.Component<Input<T>>;
const Input = Marko._.templateOf(<T,>(input: Input<T>) => {
  const component = Marko._.any as Component<T>;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
export default Input;
