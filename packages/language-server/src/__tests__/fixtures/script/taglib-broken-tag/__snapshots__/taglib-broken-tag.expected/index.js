/** @typedef {Record<string, unknown>} Input */
(
  /**
   * @this {void}
   */
  function () {
    const input = /** @type {Input} */ (Marko._.any);
    const $signal = /** @type {AbortSignal} */ (Marko._.any);
    const $global = /** @type {Marko.Global} */ (Marko._.any);
    const count = Marko._.hoist(() => __marko_internal_hoist__count);
    const __marko_internal_tag_1 = Marko._.interpolated`missing-template`;
    Marko._.renderDynamicTag(__marko_internal_tag_1)()()(
      // A tag whose taglib entry fails to load is reported on the tag, and the
      // rest of the template is still read.
      {},
    );
    const __marko_internal_tag_2 = Marko._.interpolated`broken-json`;
    Marko._.renderDynamicTag(__marko_internal_tag_2)()()({});
    Marko._.renderTemplate(__marko_internal_module_1().default)()()({
      label: "a",
    });
    {
      const count = Marko._.returned(() => __marko_internal_rendered_3);
      const __marko_internal_rendered_3 = Marko._.renderTemplate(
        __marko_internal_module_2().default,
      )()()(
        //  ^?
        {
          value: 1,
        },
      );
      Marko._.renderNativeTag("div")({
        [Marko._.content]: (() => {
          [count];
          return Marko._.voidBody;
        })(),
      });
      var __marko_internal_hoist__count = count;
    }
    Marko._.noop({ count, input, $global, $signal });
    return;
  }
)();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
/**
 * @extends { Marko._.Template<Input>}
 */
class Template extends Marko._.Template {}
export default new Template();
function __marko_internal_module_1() {
  return /** @type {typeof import("./components/ok-tag.marko")} */ (
    Marko._.any
  );
}
function __marko_internal_module_2() {
  return /** @type {typeof import("@marko/runtime-tags/tags/let.d.marko")} */ (
    Marko._.any
  );
}
//      ^?
