export interface Input {
  section?: Marko.AttrTag<{
    row?: Marko.AttrTag<{ content?: Marko.Body }>;
    cell?: Marko.AttrTag<{ content?: Marko.Body }>;
    content?: Marko.Body;
  }>;
  content?: Marko.Body;
}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.forOfTag(
    {
      of: input.section,
    },
    (section) => {
      const __marko_internal_tag_1 = section.content;
      Marko._.renderDynamicTag(__marko_internal_tag_1)()()({});
      return Marko._.voidReturn;
    },
  );
  Marko._.noop({ input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
const Input = new Template();
export default Input;
