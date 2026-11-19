export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("p")({
    id: "fail1",
    style: "line-height: 1.5 !important;",
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("p")({
    id: "fail2",
    style: "letter-spacing: 100em !important;",
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("p")({
    id: "fail3",
    style: "word-spacing: -.4ch !important;",
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.renderNativeTag("p")({
    id: "fail4",
    style:
      "word-spacing: 200%; letter-spacing: 50rem !important; line-height: 3;",
    [Marko._.content]: Marko._.voidBody,
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
