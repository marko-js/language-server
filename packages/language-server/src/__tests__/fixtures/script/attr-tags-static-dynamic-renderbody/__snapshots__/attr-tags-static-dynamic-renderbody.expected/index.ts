export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const someCondition = Marko._.hoist(
    () => __marko_internal_hoist__someCondition,
  );
  {
    const someCondition = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: false,
    });
    const __marko_internal_tag_2 = custom;
    Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
      input["@header"];
      input["@footer"];
    });
    Marko._.renderDynamicTagWithRestAttrTags(
      __marko_internal_tag_2,
      Marko._.signature(__marko_internal_tag_2),
      Marko._.actualInput,
    )({
      header: {
        [Marko._.contentFor(__marko_internal_tag_2, "header")]:
          Marko._.voidBody,
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
        return Marko._.voidBody;
      })(),
      [Marko._.restAttrTags]: [
        someCondition
          ? {
              //^?
              footer: {
                [Marko._.contentFor(__marko_internal_tag_2, "footer")]:
                  Marko._.voidBody,
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
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
