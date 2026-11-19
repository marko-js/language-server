export interface Input<T> {
  value: T;
  then?: Marko.AttrTag<{
    content: Marko.Body<[T]>;
  }>;
}
const Input = Marko._.templateOf(<T,>(input: Input<T>) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const __marko_internal_tag_1 = input.then;
  Marko._.renderDynamicTag(__marko_internal_tag_1)(input.value);
  Marko._.noop({ input, $global, $signal });
});
export default Input;
