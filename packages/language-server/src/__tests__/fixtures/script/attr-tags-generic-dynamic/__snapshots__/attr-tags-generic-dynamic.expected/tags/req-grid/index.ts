export interface Input<T> {
  rows: T[];
  column: Marko.AttrTag<{ header: string; content?: Marko.Body<[T]> }>;
  sort?: (a: T, b: T) => number;
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
          of: input.column,
        },
        (column) => {
          const __marko_internal_tag_1 = column.content;
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
