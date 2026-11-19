export interface Input {
  // Never given: a template in a `tags` dir is written in the Tags API, whose
  // body is its `content`.
  renderBody: Marko.Body;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const __marko_internal_tag_1 = input.renderBody;
  Marko._.renderDynamicTag(__marko_internal_tag_1)({});
  Marko._.noop({ input, $global, $signal });
});
export default Input;
