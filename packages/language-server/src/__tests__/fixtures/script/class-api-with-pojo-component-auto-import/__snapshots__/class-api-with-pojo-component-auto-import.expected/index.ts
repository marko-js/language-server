export type Input = Marko.ComponentInput<typeof import("./component")>;
export interface Component extends Marko.ComponentOf<
  typeof import("./component")
> {}
export default Marko._.template(
  (input: Input) => {
    const component = Marko._.any as Component;
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
    console.log(component);
    Marko._.noop({ component, state, out, input, $global, $signal });
  },
  Marko._.any as typeof import("./component"),
);
//            ^?
