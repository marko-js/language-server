export interface Input {
  name: string;
}
export interface Input {
  other: string;
}
export type Component = Marko.Component<Input>;
const Input: Marko.Template<Input, void> & {
  Component: typeof Marko.Component;
} = Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  [input.name];
  //         ^?
  [input.other];
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
export default Input;
//         ^?
