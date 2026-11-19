export interface Input<TData = string> {
  renderBody: Marko.Body<[TData], void>;
  value?: () => TData;
  key?: string;
}
export type Component<TData = string> = Marko.Component<Input<TData>>;
const Input = Marko._.templateOf(<TData = string,>(input: Input<TData>) => {
  const component = Marko._.any as Component<TData>;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
export default Input;
