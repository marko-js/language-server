export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const nested = Marko._.hoist(() => __marko_internal_hoist__nested);
  const __marko_internal_tag_1 = Marko._.interpolated`foo`;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@section"];
    input["@section"];
  });
  const __marko_internal_rendered_1 = Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_1,
    Marko._.signature(__marko_internal_tag_1),
    Marko._.actualInput,
  )({
    section: {
      [Marko._.contentFor(__marko_internal_tag_1, "section")]: (() => {
        {
          const nested = Marko._.returned(() => __marko_internal_rendered_2);
          const __marko_internal_rendered_2 =
            __marko_internal_module_1().default._({
              value: () => 1,
            });
          return () => {
            return new (class MarkoReturn<Return = void> {
              readonly [Marko._.scope] = { nested };
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
        section: {
          [Marko._.contentFor(__marko_internal_tag_1, "section")]:
            Marko._.voidBody,
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  __marko_internal_module_2().default._({
    async value() {
      nested;
      // ^?
    },
  });
  var { nested: __marko_internal_hoist__nested } = Marko._.hoisted(
    Marko._.readScope(__marko_internal_rendered_1),
  );
  Marko._.noop({ nested, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_2(): typeof import("marko/src/core-tags/core/script.d.marko");
