export interface Input<T = string> {
  //                     ^?
  value: T;
  //       ^?
}
const Input = Marko._.templateOf(<T = string,>(input: Input<T>) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  var __marko_internal_return = Marko._.returnTag({
    value: input.value,
  });
  Marko._.noop({ input, $global, $signal });
  return __marko_internal_return;
});
export default Input;
