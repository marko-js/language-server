export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const b = Marko._.hoist(() => __marko_internal_hoist__b);
  const a = Marko._.hoist(() => __marko_internal_hoist__a);
  const c = Marko._.hoist(() => __marko_internal_hoist__c);
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@comment"];
    input["@comment"];
    Marko._.nestedAttrTagNames(input["@comment"], (input) => {
      input["@comment"];
    });
  });
  const __marko_internal_rendered_1 = __marko_internal_renderer_1(
    __marko_internal_module_1().default,
  )({
    comment: {
      id: Marko._.interpolated`a`,
      comment: {
        id: Marko._.interpolated`b`,
        [Marko._.contentFor(__marko_internal_module_1)]: (() => {
          {
            const b = Marko._.returned(() => __marko_internal_rendered_2);
            const __marko_internal_rendered_2 =
              __marko_internal_module_2().default._(
                //    ^?
                {
                  value: () => "b" as const,
                },
              );
            return () => {
              return new (class MarkoReturn<Return = void> {
                readonly [Marko._.scope] = { b };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            };
          }
        })(),
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.contentFor(__marko_internal_module_1)]: (() => {
        {
          const a = Marko._.returned(() => __marko_internal_rendered_3);
          const __marko_internal_rendered_3 =
            __marko_internal_module_2().default._({
              value: () => "a" as const,
            });
          return () => {
            return new (class MarkoReturn<Return = void> {
              readonly [Marko._.scope] = { a };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        }
      })(),
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        comment: {
          id: Marko._.interpolated`c`,
          [Marko._.contentFor(__marko_internal_module_1)]: (() => {
            {
              const c = Marko._.returned(() => __marko_internal_rendered_4);
              const __marko_internal_rendered_4 =
                __marko_internal_module_2().default._({
                  value: () => "c" as const,
                });
              return () => {
                return new (class MarkoReturn<Return = void> {
                  readonly [Marko._.scope] = { c };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              };
            }
          })(),
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  __marko_internal_module_3().default._({
    value() {
      a;
      //^?
      b;
      //^?
      c;
      //^?
    },
  });
  var {
    b: __marko_internal_hoist__b,
    a: __marko_internal_hoist__a,
    c: __marko_internal_hoist__c,
  } = Marko._.hoisted(Marko._.readScope(__marko_internal_rendered_1));
  Marko._.noop({ b, a, c, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("./components/comments.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_3(): typeof import("@marko/runtime-tags/tags/effect.d.marko");
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
