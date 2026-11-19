export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("div")({
    title: "banner 1",
    role: "banner",
  });
  Marko._.renderNativeTag("div")({
    title: "banner 2",
    role: "banner",
  });
  Marko._.renderNativeTag("div")({
    title: "contentinfo 1",
    role: "contentinfo",
  });
  Marko._.renderNativeTag("div")({
    title: "contentinfo 2",
    role: "contentinfo",
  });
  Marko._.renderNativeTag("div")({
    title: "main 1",
    role: "main",
  });
  Marko._.renderNativeTag("div")({
    title: "main 2",
    role: "main",
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
