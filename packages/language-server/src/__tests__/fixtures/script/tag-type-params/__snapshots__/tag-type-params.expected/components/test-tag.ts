export interface Input<T, U> {
  data: T;
  content: Marko.Body<[T], U>;
}
const Input = Marko._.templateOf(<T, U>(input: Input<T, U>) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  var __marko_internal_return = Marko._.returnTag({
    value: 1 as unknown as U,
  });
  Marko._.noop({ input, $global, $signal });
  return __marko_internal_return;
});
export default Input;
