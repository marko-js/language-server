export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  const el = Marko._.hoist(() => __marko_internal_hoist__el);
  const __marko_internal_rendered_1 = Marko._.renderNativeTag("div")({
    [Marko._.content]: (() => {
      {
        const x = Marko._.returned(() => __marko_internal_rendered_2);
        const __marko_internal_rendered_2 = Marko._.renderTemplate(
          __marko_internal_module_1().default,
        )()()({
          value: 1,
        });
        const __marko_internal_change__x = Marko._.change(
          "x",
          "value",
          __marko_internal_rendered_2.return,
        );
        [x];
        {
          const el = Marko._.el("button");
          Marko._.renderNativeTag("button")({
            onClick() {
              __marko_internal_change__x.x = 2;
              __marko_internal_change__x.x++;
              ++__marko_internal_change__x.x;
            },
            [Marko._.content]: Marko._.voidBody,
          });
          return () => {
            return new (class MarkoReturn<Return = void> {
              readonly [Marko._.scope] = { x, el };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        }
      }
    })(),
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)()()({
    value() {
      console.log(el());
      //            ^?
    },
  });
  var { x: __marko_internal_hoist__x, el: __marko_internal_hoist__el } =
    Marko._.hoisted(Marko._.readScope(__marko_internal_rendered_1));
  Marko._.noop({ x, el, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/effect.d.marko");
