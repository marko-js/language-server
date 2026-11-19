export interface Input {
  section?: Marko.AttrTag<{
    item?: Marko.AttrTag<{
      content: Marko.Body<
        [
          {
            label: string;
          },
        ]
      >;
    }>;
  }>;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.forOfTag(
    {
      of: input.section,
    },
    (section) => {
      Marko._.forOfTag(
        {
          of: section.item,
        },
        (item) => {
          const __marko_internal_tag_1 = item.content;
          Marko._.renderDynamicTag(__marko_internal_tag_1)({
            label: "label",
          });
          return Marko._.voidReturn;
        },
      );
      return Marko._.voidReturn;
    },
  );
  Marko._.noop({ input, $global, $signal });
});
export default Input;
