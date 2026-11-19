export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const hoistedFromStaticMember = Marko._.hoist(
    () => __marko_internal_hoist__hoistedFromStaticMember,
  );
  const __marko_internal_tag_1 = custom;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@b"];
    input["@b"];
    input["@a"];
  });
  const __marko_internal_rendered_1 = Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_1,
    Marko._.signature(__marko_internal_tag_1),
    Marko._.actualInput,
  )({
    b: {
      [Symbol.iterator]: Marko._.any,
    },
    a: {
      b: 1,
      [Marko._.contentFor(__marko_internal_tag_1, "a")]: (() => {
        {
          const hoistedFromStaticMember = Marko._.returned(
            () => __marko_internal_rendered_2,
          );
          const __marko_internal_rendered_2 =
            __marko_internal_module_1().default._({
              value: () => 1 as const,
            });
          return () => {
            return new (class MarkoReturn<Return = void> {
              readonly [Marko._.scope] = { hoistedFromStaticMember };
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
        b: {
          c: 2,
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  __marko_internal_module_2().default._({
    value() {
      hoistedFromStaticMember;
      //^?
    },
  });
  var {
    hoistedFromStaticMember: __marko_internal_hoist__hoistedFromStaticMember,
  } = Marko._.hoisted(Marko._.readScope(__marko_internal_rendered_1));
  Marko._.noop({ hoistedFromStaticMember, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/effect.d.marko");
