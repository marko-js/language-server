export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const hoisted = Marko._.hoist(() => __marko_internal_hoist__hoisted);
  __marko_internal_module_1().default._({
    [Marko._.contentFor(__marko_internal_module_1)]: (a) => {
      [a];
      return Marko._.voidReturn;
    },
  });
  __marko_internal_module_1().default._({
    [Marko._.contentFor(__marko_internal_module_1)]: (a) => {
      var __marko_internal_return = Marko._.returnTag({
        value: a,
      });
      return new (class MarkoReturn<Return = void> {
        declare return: Return;
        constructor(_?: Return) {}
      })(__marko_internal_return);
    },
  });
  __marko_internal_module_1().default._({
    [Marko._.contentFor(__marko_internal_module_1)]: (() => {
      var __marko_internal_return = Marko._.returnTag({
        value: "b" as const,
      });
      return () => {
        return new (class MarkoReturn<Return = void> {
          declare return: Return;
          constructor(_?: Return) {}
        })(__marko_internal_return);
      };
    })(),
  });
  __marko_internal_module_1().default._({
    [Marko._.contentFor(__marko_internal_module_1)]: (() => {
      var __marko_internal_return = Marko._.returnTag({
        value: "c" as const,
      });
      return () => {
        return new (class MarkoReturn<Return = void> {
          declare return: Return;
          constructor(_?: Return) {}
        })(__marko_internal_return);
      };
    })(),
  });
  const __marko_internal_rendered_1 = __marko_internal_renderer_1(
    __marko_internal_module_1().default,
  )({
    [Marko._.contentFor(__marko_internal_module_1)]: (() => {
      {
        const hoisted = Marko._.returned(() => __marko_internal_rendered_2);
        const __marko_internal_rendered_2 =
          __marko_internal_module_2().default._({
            value: () => 1 as const,
          });
        var __marko_internal_return = Marko._.returnTag({
          value: "b" as const,
        });
        return () => {
          return new (class MarkoReturn<Return = void> {
            readonly [Marko._.scope] = { hoisted };
            declare return: Return;
            constructor(_?: Return) {}
          })(__marko_internal_return);
        };
      }
    })(),
  });
  [
    () => {
      hoisted;
      //^?
    },
  ];
  var { hoisted: __marko_internal_hoist__hoisted } = Marko._.hoisted(
    Marko._.readScope(__marko_internal_rendered_1),
  );
  Marko._.noop({ hoisted, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("./components/test-tag.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/let.d.marko");
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.renderer(template._, Marko._.actualInput);
}
