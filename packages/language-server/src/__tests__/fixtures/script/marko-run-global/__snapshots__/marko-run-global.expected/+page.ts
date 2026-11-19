export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Run.Context;
  Marko._.renderNativeTag("div")(
    // A route's `$global` is the context `@marko/run` generates for it.
    {
      [Marko._.content]: (() => {
        [$global.params.id];
        return Marko._.voidBody;
      })(),
    },
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
//     ^?
