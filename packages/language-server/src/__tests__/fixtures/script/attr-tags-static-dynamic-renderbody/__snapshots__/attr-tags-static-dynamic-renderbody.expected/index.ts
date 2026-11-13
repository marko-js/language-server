export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const someCondition = Marko._.hoist(
    () => __marko_internal_hoist__someCondition,
  );
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  ).default;
  {
    const someCondition = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      value: false,
    });
    const __marko_internal_tag_2 = custom;
    Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
      input["@header"];
      input["@footer"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_2)(
      Marko._.withRestAttrTags,
    )()({
      header: {
        [Marko._.contentFor(__marko_internal_tag_2)]: (() => {
          return () => {
            return Marko._.voidReturn;
          };
        })(),
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.contentFor(__marko_internal_tag_2)]: (() => {
        Marko._.forOfTag(
          {
            of: [1],
          },
          (x) => {
            [x];
            return Marko._.voidReturn;
          },
        );
        return () => {
          return Marko._.voidReturn;
        };
      })(),
      [Marko._.restAttrTags]: [
        someCondition
          ? {
              //^?
              footer: {
                [Marko._.contentFor(__marko_internal_tag_2)]: (() => {
                  return () => {
                    return Marko._.voidReturn;
                  };
                })(),
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
      ...Marko._.givenAttrTags("footer"),
    });
    var __marko_internal_hoist__someCondition = someCondition;
  }
  Marko._.noop({ someCondition, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
export default new Template();
