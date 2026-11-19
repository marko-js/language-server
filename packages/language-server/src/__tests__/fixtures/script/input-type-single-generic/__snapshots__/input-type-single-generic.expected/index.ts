export interface Input<T extends { name: string }> {
  options: T[];
  onChange: (option: T) => unknown;
}
export type Component<T extends { name: string }> = Marko.Component<Input<T>>;
const Input = Marko._.templateOf(
  <T extends { name: string }>(input: Input<T>) => {
    const component = Marko._.any as Component<T>;
    const state = Marko._.state(component);
    const out = Marko._.any as Marko.Out;
    const $signal = Marko._.any as AbortSignal;
    const $global = Marko._.any as Marko.Global;
    [input.options];
    //         ^?
    [input.onChange];
    Marko._.noop({ component, state, out, input, $global, $signal });
  },
  Marko.Component,
);
export default Input;
//         ^?
