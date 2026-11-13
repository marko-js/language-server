/** @typedef {Record<string, unknown>} Input */
(
  /**
   * @this {void}
   */
  function () {
    const input = /** @type {Input} */ (Marko._.any);
    const $signal = /** @type {AbortSignal} */ (Marko._.any);
    const $global = Marko._.getGlobal(
      // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
      (Marko._.error, /** @type {MarkoRun.Context} */ (Marko._.any)),
    );
    const count = Marko._.hoist(() => __marko_internal_hoist__count);
    const __marko_internal_tag_1 = Marko._.interpolated`missing-template`;
    Marko._.renderDynamicTag(__marko_internal_tag_1)()()(
      // A tag whose taglib entry fails to load is reported on the tag, and the
      // rest of the template is still read.
      {},
    );
    const __marko_internal_tag_2 = Marko._.interpolated`broken-json`;
    Marko._.renderDynamicTag(__marko_internal_tag_2)()()({});
    const __marko_internal_tag_3 = Marko._.resolveTemplate(
      import("./components/ok-tag.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_3)()()({
      label: "a",
    });
    const __marko_internal_tag_4 = Marko._.resolveTemplate(
      import("@marko/runtime-tags/tags/let.d.marko"),
    ).default;
    {
      const count = Marko._.returned(() => __marko_internal_rendered_4);
      const __marko_internal_rendered_4 = Marko._.renderTemplate(
        __marko_internal_tag_4,
      )()()(
        //  ^?
        {
          value: 1,
        },
      );
      Marko._.renderNativeTag("div")()()({
        [Marko._.content]: (() => {
          [count];
          return () => {
            return Marko._.voidReturn;
          };
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
//      ^?
