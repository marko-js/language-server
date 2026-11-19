export interface Input {}
const Line: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("div")(
    // use tags
    {},
  );
  Marko._.noop({ input, $global, $signal });
});
export default Line;
