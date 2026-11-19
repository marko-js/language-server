export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  __marko_internal_module_1().default._({
    color: "red",
    fanciness: 5,
  });
  __marko_internal_module_2().default._(
    //            ^?          ^?
    {
      size: "large",
      [Marko._.contentFor(__marko_internal_module_2)]: Marko._.voidBody,
    },
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("./components/fancy-button/index.marko");
declare function __marko_internal_module_2(): typeof import("./components/regular-button/index.marko");
//              ^?
