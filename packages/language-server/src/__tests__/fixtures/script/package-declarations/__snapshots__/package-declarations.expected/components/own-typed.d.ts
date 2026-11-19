// Read in place of the template beside it, as a `.d.ts` is in place of a
// `.js` file: it declares a `title` the template's own script does not.
export interface Input {
  name: string;
  title?: string;
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
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
export default Input;
