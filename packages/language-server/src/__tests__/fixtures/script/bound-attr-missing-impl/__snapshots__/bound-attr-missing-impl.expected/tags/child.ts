export interface Input {
  value: any;
  valueChange: any;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.noop({ input, $global, $signal });
});
export default Input;
