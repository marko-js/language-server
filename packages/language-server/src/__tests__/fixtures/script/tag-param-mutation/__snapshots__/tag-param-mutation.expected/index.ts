export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const string = Marko._.hoist(() => __marko_internal_hoist__string);
  const inputId = Marko._.hoist(() => __marko_internal_hoist__inputId);
  {
    const string = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_module_1().default,
    )()()({
      value: "bar",
    });
    const __marko_internal_change__string = Marko._.change(
      "string",
      "value",
      __marko_internal_rendered_1.return,
    );
    Marko._.renderTemplate(__marko_internal_module_2().default)()()({
      //  ^?
      [Marko._.contentFor(__marko_internal_module_2)]: (val) => {
        Marko._.renderNativeTag("button")({
          onClick() {
            __marko_internal_change__string.string = val;
          },
          [Marko._.content]: (() => {
            //   ^?      ^?
            [val];
            return Marko._.voidBody;
          })(),
        });
        return Marko._.voidReturn;
      },
    });
    const __marko_internal_rendered_2 = Marko._.forOfTag(
      {
        of: [],
      },
      (_unused) => {
        {
          const inputId = Marko._.returned(() => __marko_internal_rendered_3);
          const __marko_internal_rendered_3 = Marko._.renderTemplate(
            __marko_internal_module_1().default,
          )()()({
            value: "",
          });
          Marko._.renderNativeTag("input")({
            id: inputId,
          });
          return new (class MarkoReturn<Return = void> {
            readonly [Marko._.scope] = { inputId };
            declare return: Return;
            constructor(_?: Return) {}
          })();
        }
      },
    );
    Marko._.renderNativeTag("button")({
      onClick() {
        inputId;
        // ^?
      },
      [Marko._.content]: Marko._.voidBody,
    });
    var __marko_internal_hoist__string = string;
    var { inputId: __marko_internal_hoist__inputId } = Marko._.hoisted(
      Marko._.readScope(__marko_internal_rendered_2),
    );
  }
  Marko._.noop({ string, inputId, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("./components/test-tag.marko");
