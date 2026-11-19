export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("label")({
    for: "one",
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("label")({
    for: "one",
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("input")({
    id: "one",
  });
  Marko._.renderNativeTag("label")({
    for: "two",
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("label")({
    [Marko._.content]: (() => {
      Marko._.renderNativeTag("input")({
        id: "two",
      });
      return Marko._.voidBody;
    })(),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
