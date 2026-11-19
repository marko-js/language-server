export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const a = Marko._.hoist(() => __marko_internal_hoist__a);
  const b = Marko._.hoist(() => __marko_internal_hoist__b);
  const c = Marko._.hoist(() => __marko_internal_hoist__c);
  const d = Marko._.hoist(() => __marko_internal_hoist__d);
  const __marko_internal_rendered_1 = (() => {
    if ($global.foo) {
      {
        const a = Marko._.returned(() => __marko_internal_rendered_2);
        const __marko_internal_rendered_2 =
          __marko_internal_module_1().default._({
            value: ["apples", "oranges"] as const,
          });
        {
          const b = Marko._.returned(() => __marko_internal_rendered_3);
          const __marko_internal_rendered_3 =
            __marko_internal_module_1().default._(
              // ^?
              {
                value: ["slice", "dice"] as const,
              },
            );
          const __marko_internal_rendered_4 = Marko._.forOfTag(
            {
              of: b,
            },
            (
              // ^?
              baz,
            ) => {
              {
                const c = Marko._.returned(() => __marko_internal_rendered_5);
                const __marko_internal_rendered_5 =
                  __marko_internal_module_1().default._({
                    value: () => a.filter((e) => e.length),
                  });
                [baz];
                return new (class MarkoReturn<Return = void> {
                  readonly [Marko._.scope] = { c };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              }
            },
          );
          return {
            scope: { ...Marko._.readScope(__marko_internal_rendered_4), a, b },
          };
        }
      }
    } else {
      return undefined;
    }
  })();
  const __marko_internal_rendered_6 = (() => {
    if ($global.foo) {
      {
        const { d } = Marko._.returned(() => __marko_internal_rendered_7);
        const __marko_internal_rendered_7 =
          __marko_internal_module_1().default._({
            value: { d: () => 1 } as const,
          });
        return {
          scope: { d },
        };
      }
    } else {
      {
        const { d } = Marko._.returned(() => __marko_internal_rendered_8);
        const __marko_internal_rendered_8 =
          __marko_internal_module_1().default._({
            value: { d: () => 2 } as const,
          });
        return {
          scope: { d },
        };
      }
    }
  })();
  [
    () => {
      a;
      //^?
      b;
      //^?
      c;
      //^?
      d;
      //^?
    },
  ];
  var {
    a: __marko_internal_hoist__a,
    b: __marko_internal_hoist__b,
    c: __marko_internal_hoist__c,
    d: __marko_internal_hoist__d,
  } = Marko._.hoisted(
    Marko._.readScopes({
      __marko_internal_rendered_1,
      __marko_internal_rendered_6,
    }),
  );
  Marko._.noop({ a, b, c, d, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/const.d.marko");
