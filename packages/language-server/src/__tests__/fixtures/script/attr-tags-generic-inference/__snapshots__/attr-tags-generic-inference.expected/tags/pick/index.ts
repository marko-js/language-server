export interface Input<T> {
  option?: Marko.AttrTag<{ value: T; content?: Marko.Body<[T]> }>;
}
const Input = Marko._.templateOf(<T,>(input: Input<T>) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.forOfTag(
    {
      of: input.option,
    },
    (option) => {
      const __marko_internal_tag_1 = option.content;
      Marko._.renderDynamicTag(__marko_internal_tag_1)(option.value);
      return Marko._.voidReturn;
    },
  );
  Marko._.noop({ input, $global, $signal });
});
export default Input;
