export interface Input {
  req: Marko.AttrTag<{ content?: Marko.Body }>;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const __marko_internal_tag_1 = input.req.content;
  Marko._.renderDynamicTag(__marko_internal_tag_1)({});
  Marko._.noop({ input, $global, $signal });
});
export default Input;
