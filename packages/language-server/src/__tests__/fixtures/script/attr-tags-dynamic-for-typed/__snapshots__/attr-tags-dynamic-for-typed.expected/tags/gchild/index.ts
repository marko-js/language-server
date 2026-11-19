export interface Input<T> {
  rows: T[];
  item?: Marko.AttrTag<{ label?: string; content?: Marko.Body<[T]> }>;
}
const Input = Marko._.templateOf(<T,>(input: Input<T>) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.forOfTag(
    {
      of: input.rows,
    },
    (row) => {
      Marko._.forOfTag(
        {
          of: input.item,
        },
        (item) => {
          const __marko_internal_tag_1 = item.content;
          Marko._.renderDynamicTag(__marko_internal_tag_1)(row);
          return Marko._.voidReturn;
        },
      );
      return Marko._.voidReturn;
    },
  );
  Marko._.noop({ input, $global, $signal });
});
export default Input;
