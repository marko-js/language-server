export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const x = Marko._.hoist(() => __marko_internal_hoist__x);
  {
    const x = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: 1,
    });
    const __marko_internal_change__x = Marko._.change(
      "x",
      "value",
      __marko_internal_rendered_1,
    );
    Marko._.renderNativeTag("div")({
      "data-function"() {
        __marko_internal_change__x.x++;
      },
    });
    Marko._.renderNativeTag("div")({
      "data-function"(y = __marko_internal_change__x.x++) {
        y;
      },
    });
    Marko._.renderNativeTag("div")({
      "data-function": () => {
        __marko_internal_change__x.x++;
      },
    });
    Marko._.renderNativeTag("div")({
      "data-function": (y = __marko_internal_change__x.x++) => {
        y;
      },
    });
    Marko._.renderNativeTag("div")({
      "data-function": function () {
        __marko_internal_change__x.x++;
      },
    });
    Marko._.renderNativeTag("div")({
      "data-function": function (y = __marko_internal_change__x.x++) {
        y;
      },
    });
    Marko._.renderNativeTag("div")({
      "data-function"() {
        function testA() {
          __marko_internal_change__x.x++;
        }

        function testB(y = __marko_internal_change__x.x++) {
          y;
        }

        class TestC {
          constructor() {
            this.#privateMethodA;
            this.#privateMethodB;
          }
          methodA() {
            __marko_internal_change__x.x++;
          }
          methodB(y = __marko_internal_change__x.x++) {
            y;
          }
          #privateMethodA() {
            __marko_internal_change__x.x++;
          }
          #privateMethodB(y = __marko_internal_change__x.x++) {
            y;
          }
        }

        testA;
        testB;
        TestC;
      },
    });
    var __marko_internal_hoist__x = x;
  }
  Marko._.noop({ x, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
