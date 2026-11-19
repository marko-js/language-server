export interface Input {
  title: string;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("div")({
    [Marko._.content]: (() => {
      [input.title];
      return Marko._.voidBody;
    })(),
  });
  Marko._.noop({ input, $global, $signal });
});
export default Input;
