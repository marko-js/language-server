export interface Input<T> {
  value: T;
}
import type Component from "./component";
export type { Component };
const Input = Marko._.templateOf(
  <T,>(input: Input<T>) => {
    const component = Marko._.any as Component<T>;
    const state = Marko._.state(component);
    const out = Marko._.any as Marko.Out;
    const $signal = Marko._.any as AbortSignal;
    const $global = Marko._.any as Marko.Global;
    Marko._.renderNativeTag("div")({
      onClick: component.handleClickMissing,
    });
    Marko._.renderNativeTag("div")({
      onClick: component["strange-handler"],
    });
    console.log(component.input);
    Marko._.noop({ component, state, out, input, $global, $signal });
  },
  Marko._.any as typeof import("./component"),
);
export default Input;
//                      ^?
