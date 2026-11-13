export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const nested = Marko._.hoist(() => __marko_internal_hoist__nested);
  const __marko_internal_tag_1 = Marko._.interpolated`foo`;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@section"];
    input["@section"];
  });
  const __marko_internal_rendered_1 = Marko._.renderDynamicTag(
    __marko_internal_tag_1,
  )(Marko._.withRestAttrTags)()({
    section: {
      [Marko._.contentFor(__marko_internal_tag_1)]: (() => {
        const __marko_internal_tag_2 = Marko._.resolveTemplate(
          import("@marko/runtime-tags/tags/const.d.marko"),
        ).default;
        {
          const nested = Marko._.returned(() => __marko_internal_rendered_2);
          const __marko_internal_rendered_2 = Marko._.renderTemplate(
            __marko_internal_tag_2,
          )()()({
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
          [Marko._.contentFor(__marko_internal_tag_1)]: (() => {
            return () => {
              return Marko._.voidReturn;
            };
          })(),
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_3 = Marko._.resolveTemplate(
    import("marko/src/core-tags/core/script.d.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_3)()()({
    async value() {
      nested;
      // ^?
    },
  });
  var { nested: __marko_internal_hoist__nested } = Marko._.hoisted(
    Marko._.readScope(__marko_internal_rendered_1),
  );
  Marko._.noop({ nested, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
