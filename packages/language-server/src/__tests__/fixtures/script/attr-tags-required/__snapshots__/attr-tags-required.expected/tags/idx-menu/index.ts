export interface Input {
  req: Marko.AttrTag<{ label?: string }>;
  [key: string]: unknown;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderNativeTag("div")({});
  Marko._.noop({ input, $global, $signal });
});
export default Input;
