export interface Input {
  // Never given: written in the Tags API (though not in a `tags` dir), its
  // body is its `content`.
  renderBody: Marko.Body;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const body = Marko._.hoist(() => __marko_internal_hoist__body);
  {
    const body = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: input.renderBody,
    });
    const __marko_internal_tag_2 = body;
    Marko._.renderDynamicTag(__marko_internal_tag_2)({});
    var __marko_internal_hoist__body = body;
  }
  Marko._.noop({ body, input, $global, $signal });
});
export default Input;
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/const.d.marko");
