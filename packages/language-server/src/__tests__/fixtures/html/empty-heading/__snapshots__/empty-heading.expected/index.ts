export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("h1")({
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("h2")({
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("h3")({
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("h4")({
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("h5")({
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("h6")({
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
