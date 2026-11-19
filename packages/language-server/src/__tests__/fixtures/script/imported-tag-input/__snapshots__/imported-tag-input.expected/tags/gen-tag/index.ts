export interface Input<T> {
  items: T[];
  content: Marko.Body<[{ item: T; index: number }]>;
}
const Input = Marko._.templateOf(<T,>(input: Input<T>) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.forOfTag(
    {
      of: input.items,
    },
    (item, index) => {
      const __marko_internal_tag_1 = input.content;
      Marko._.renderDynamicTag(__marko_internal_tag_1)({
        item: item,
        index: index,
      });
      return Marko._.voidReturn;
    },
  );
  Marko._.noop({ input, $global, $signal });
});
export default Input;
