export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const hoisted = Marko._.hoist(() => __marko_internal_hoist__hoisted);
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
    [Marko._.contentFor(__marko_internal_module_1)]: (a) => {
      [a];
      return Marko._.voidReturn;
    },
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
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
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
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
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
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
  const __marko_internal_rendered_1 = Marko._.renderTemplate(
    __marko_internal_module_1().default,
  )()()({
    [Marko._.contentFor(__marko_internal_module_1)]: (() => {
      {
        const hoisted = Marko._.returned(() => __marko_internal_rendered_2);
        const __marko_internal_rendered_2 = Marko._.renderTemplate(
          __marko_internal_module_2().default,
        )()()({
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
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./components/test-tag.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/let.d.marko");
