export interface Input {
  section?: Marko.AttrTag<{
    row?: Marko.AttrTag<{ content?: Marko.Body }>;
    cell?: Marko.AttrTag<{ content?: Marko.Body }>;
    content?: Marko.Body;
  }>;
  content?: Marko.Body;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.forOfTag(
    {
      of: input.section,
    },
    (section) => {
      const __marko_internal_tag_1 = section.content;
      Marko._.renderDynamicTag(__marko_internal_tag_1)({});
      return Marko._.voidReturn;
    },
  );
  Marko._.noop({ input, $global, $signal });
});
export default Input;
