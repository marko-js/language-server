export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  let i = 0;
  while (++i < 10) {
    //       ^?
    [i];
  }
  i = 0;
  while (++i < 10) {}
  //       ^?
  let done = false;
  i = 0;
  while (!done) {
    //      ^?
    [done];
    //  ^?
    if (++i === 5) {
      done = true;
    }
  }
  while (undefined) {}
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
