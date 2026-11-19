import CustomTagA from "./components/TestTagA.marko";
import CustomTagB from "./components/TestTagB.marko";
export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const TestTagA = Marko._.hoist(() => __marko_internal_hoist__TestTagA);
  {
    const TestTagA = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: CustomTagA,
    });
    const __marko_internal_tag_2 = Marko._.fallbackTemplate(
      // @ts-ignore
      TestTagA,
      __marko_internal_module_2().default,
    );
    Marko._.renderDynamicTag(__marko_internal_tag_2)({
      a: "hello",
    });
    const __marko_internal_tag_3 = Marko._.fallbackTemplate(
      // @ts-ignore
      TestTagB,
      __marko_internal_module_3().default,
    );
    Marko._.renderDynamicTag(__marko_internal_tag_3)({
      b: "hello",
    });
    Marko._.renderNativeTag("div")({
      [Marko._.content]: (() => {
        {
          const TestTagA = Marko._.returned(() => __marko_internal_rendered_4);
          const __marko_internal_rendered_4 =
            __marko_internal_module_1().default._({
              value: CustomTagB,
            });
          const __marko_internal_tag_5 = Marko._.fallbackTemplate(
            // @ts-ignore
            TestTagA,
            __marko_internal_module_2().default,
          );
          Marko._.renderDynamicTag(__marko_internal_tag_5)({
            a: "hello",
          });
          return Marko._.voidBody;
        }
      })(),
    });
    const __marko_internal_tag_6 = Marko._.fallbackTemplate(
      // @ts-ignore
      TestTagA,
      __marko_internal_module_2().default,
    );
    Marko._.renderDynamicTag(__marko_internal_tag_6)({
      a: "hello",
    });
    var __marko_internal_hoist__TestTagA = TestTagA;
  }
  Marko._.noop({ TestTagA, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_2(): typeof import("./components/TestTagA.marko");
declare function __marko_internal_module_3(): typeof import("./components/TestTagB.marko");
