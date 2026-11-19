export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("div")({
    "aria-hidden": "true",
    [Marko._.content]: (() => {
      Marko._.renderNativeTag("a")({
        href: "/",
        style: "position:absolute; top:-999em",
        [Marko._.content]: Marko._.voidBody,
      });
      return Marko._.voidBody;
    })(),
  });
  Marko._.renderNativeTag("div")({
    "aria-hidden": "true",
    [Marko._.content]: (() => {
      Marko._.renderNativeTag("input")({
        "aria-disabled": "true",
      });
      return Marko._.voidBody;
    })(),
  });
  Marko._.renderNativeTag("div")({
    "aria-hidden": "true",
    [Marko._.content]: (() => {
      Marko._.renderNativeTag("div")({
        "aria-hidden": "false",
        [Marko._.content]: (() => {
          Marko._.renderNativeTag("button")({
            [Marko._.content]: Marko._.voidBody,
          });
          return Marko._.voidBody;
        })(),
      });
      return Marko._.voidBody;
    })(),
  });
  Marko._.renderNativeTag("p")({
    tabindex: "0",
    "aria-hidden": "true",
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("details")({
    "aria-hidden": "true",
    [Marko._.content]: (() => {
      Marko._.renderNativeTag("summary")({
        [Marko._.content]: Marko._.voidBody,
      });
      Marko._.renderNativeTag("p")({
        [Marko._.content]: Marko._.voidBody,
      });
      return Marko._.voidBody;
    })(),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
