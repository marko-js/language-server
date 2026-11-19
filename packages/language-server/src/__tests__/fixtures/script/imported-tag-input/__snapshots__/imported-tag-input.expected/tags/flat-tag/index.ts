export interface Input {
  title: string;
  count?: number;
}
const Input = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  var __marko_internal_return = Marko._.returnTag({
    value: input.title,
  });
  Marko._.noop({ input, $global, $signal });
  return __marko_internal_return;
});
export default Input;
