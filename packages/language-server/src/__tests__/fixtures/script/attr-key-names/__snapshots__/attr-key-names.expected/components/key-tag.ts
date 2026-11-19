export interface Input {
  key?: string;
  "aria-label"?: string;
  class?: string;
  for?: string;
  default?: number;
  value?: number;
  valueChange?: (value: number) => void;
  "data-count"?: number;
  "my-item"?: Marko.AttrTag<{ label: string }>;
  item?: Marko.AttrTag<{ label: string }>;
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
  Marko._.renderNativeTag("div")({});
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
export default Input;
