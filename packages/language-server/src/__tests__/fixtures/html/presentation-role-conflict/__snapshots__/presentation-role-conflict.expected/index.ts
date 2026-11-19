export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("li")({
    role: "none",
    id: "global-attr",
    "aria-hidden": "true",
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("button")({
    id: "natively-focusable",
    role: "none",
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("li")({
    role: "presentation",
    id: "tabindex",
    tabindex: "0",
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
