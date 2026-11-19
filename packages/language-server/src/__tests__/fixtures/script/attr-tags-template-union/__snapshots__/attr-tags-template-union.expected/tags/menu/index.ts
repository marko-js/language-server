export interface Input {
  item?: Marko.AttrTag<{
    size?: "small" | "large";
    row?: Marko.AttrTag<{ content?: Marko.Body<[{ bar: number }]> }>;
    content?: Marko.Body<[{ foo: string }]>;
  }>;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.forOfTag(
    {
      of: input.item,
    },
    (item) => {
      const __marko_internal_tag_1 = item.content;
      Marko._.renderDynamicTag(__marko_internal_tag_1)({
        foo: "x",
      });
      return Marko._.voidReturn;
    },
  );
  Marko._.noop({ input, $global, $signal });
});
export default Input;
