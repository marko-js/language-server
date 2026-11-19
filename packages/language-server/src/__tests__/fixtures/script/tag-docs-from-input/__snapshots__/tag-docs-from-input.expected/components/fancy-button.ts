/**
 * A button with a fancy border, see {@link https://example.com/fancy the guide}.
 * @deprecated Use `<plain-button>` instead.
 * @see https://example.com/fancy-button
 */ export interface Input {
  /** The text on the button. */
  label: string;
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
  Marko._.renderNativeTag("button")({
    [Marko._.content]: (() => {
      [input.label];
      return Marko._.voidBody;
    })(),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
export default Input;
