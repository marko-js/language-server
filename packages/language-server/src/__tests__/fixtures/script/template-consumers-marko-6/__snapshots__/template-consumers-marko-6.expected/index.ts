import Counter from "./tags/counter.marko";
//     ^?
import Generic from "./tags/generic.marko";
import JsTags from "./js/tags/js-tags.marko";
import JsGeneric from "./js/tags/js-generic.marko";
export function consume(el: Element) {
  const html = Counter.render({ start: 1 });
  //    ^?
  const mounted = Counter.mount({ start: 1 }, el);
  //    ^?
  mounted.value = mounted.value + 1;
  //      ^?
  const genericValue = Generic.mount({ value: "x" }, el).value;
  //    ^?
  const jsName = JsTags.mount({ name: "x" }, el).value;
  //    ^?
  const jsGenericValue = JsGeneric.mount({ value: 1 }, el).value;
  //    ^?
  Counter.render;
  //      ^?
  Counter.mount;
  //      ^?
  Generic.render;
  //      ^?
  Generic.mount;
  //      ^?
  JsGeneric.mount;
  //        ^?
  Counter.mount({ start: "bad" }, el);
  Generic.render({});
  JsTags.mount({ name: 1 }, el);
  return [html, genericValue, jsName, jsGenericValue];
}
export declare const counterInput: Marko.Input<typeof Counter>;
//                   ^?
export declare const genericInput: Marko.Input<typeof Generic>;
//                   ^?
export declare const jsInput: Marko.Input<typeof JsTags>;
//                   ^?
export declare const counterReturn: Marko.Return<typeof Counter>;
//                   ^?
export const genericTemplate: Marko.Template<any, any> = Generic;
export const jsGenericTemplate: Marko.Template<any, any> = JsGeneric;
export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const count = Marko._.hoist(() => __marko_internal_hoist__count);
  const countByName = Marko._.hoist(() => __marko_internal_hoist__countByName);
  const countDynamic = Marko._.hoist(
    () => __marko_internal_hoist__countDynamic,
  );
  const name = Marko._.hoist(() => __marko_internal_hoist__name);
  {
    const count = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      start: 1,
    });
    __marko_internal_module_1().default._({
      start: "bad",
    });
    const __marko_internal_tag_2 = Counter;
    {
      const countByName = Marko._.returned(() => __marko_internal_rendered_2);
      const __marko_internal_rendered_2 = Marko._.renderDynamicTag(
        __marko_internal_tag_2,
      )({
        start: 2,
      });
      const __marko_internal_tag_3 = Counter;
      {
        const countDynamic = Marko._.returned(
          () => __marko_internal_rendered_3,
        );
        const __marko_internal_rendered_3 = Marko._.renderDynamicTag(
          __marko_internal_tag_3,
        )({
          start: 3,
        });
        __marko_internal_module_2().default._({
          value: "x",
          ["content"]: (item) => {
            [item];
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_4 = Generic;
        Marko._.renderDynamicTag(__marko_internal_tag_4)({
          value: 1,
          //                         ^?
          ["content"]: (item) => {
            [item];
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_5 = JsTags;
        {
          const name = Marko._.returned(() => __marko_internal_rendered_5);
          const __marko_internal_rendered_5 = Marko._.renderDynamicTag(
            __marko_internal_tag_5,
          )(
            //                          ^?
            {
              name: "x",
            },
          );
          Marko._.renderNativeTag("div")({
            ["content"]: (() => {
              [count];
              [countByName];
              [countDynamic];
              [name];
              return Marko._.voidBody;
            })(),
          });
          var __marko_internal_hoist__count = count;
          var __marko_internal_hoist__countByName = countByName;
          var __marko_internal_hoist__countDynamic = countDynamic;
          var __marko_internal_hoist__name = name;
        }
      }
    }
  }
  Marko._.noop({
    count,
    countByName,
    countDynamic,
    name,
    input,
    $global,
    $signal,
  });
});
declare function __marko_internal_module_1(): typeof import("./tags/counter.marko");
declare function __marko_internal_module_2(): typeof import("./tags/generic.marko");
//      ^?      ^?             ^?              ^?
