export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  const y = Marko._.hoist(() => __marko_internal_hoist__y);
  {
    const x = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_module_1().default,
    )()()({
      value: 1,
    });
    const __marko_internal_change__x = Marko._.change(
      "x",
      "value",
      __marko_internal_rendered_1.return,
    );
    Marko._.renderNativeTag("button")({
      onClick() {
        __marko_internal_change__x.x++;
        //^?
      },
      [Marko._.content]: Marko._.voidBody,
    });
    const __marko_internal_tag_2 = Marko._.interpolated`foo`;
    const __marko_internal_rendered_2 = Marko._.renderDynamicTag(
      __marko_internal_tag_2,
    )()()({
      [Marko._.contentFor(__marko_internal_tag_2)]: (() => {
        {
          const y = Marko._.returned(() => __marko_internal_rendered_3);
          const __marko_internal_rendered_3 = Marko._.renderTemplate(
            __marko_internal_module_1().default,
          )()()({
            value: "hello",
          });
          const __marko_internal_change__y = Marko._.change(
            "y",
            "value",
            __marko_internal_rendered_3.return,
          );
          Marko._.renderNativeTag("button")({
            onClick() {
              __marko_internal_change__x.x++;
              //  ^?
              __marko_internal_change__y.y = "goodbye";
              //  ^?
            },
            [Marko._.content]: Marko._.voidBody,
          });
          return () => {
            return new (class MarkoReturn<Return = void> {
              readonly [Marko._.scope] = { y };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        }
      })(),
    });
    var __marko_internal_hoist__x = x;
    var { y: __marko_internal_hoist__y } = Marko._.hoisted(
      Marko._.readScope(__marko_internal_rendered_2),
    );
  }
  Marko._.noop({ x, y, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
