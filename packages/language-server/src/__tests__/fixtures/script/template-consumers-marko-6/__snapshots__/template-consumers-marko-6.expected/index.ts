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
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const count = Marko._.hoist(() => __marko_internal_hoist__count);
  const countByName = Marko._.hoist(() => __marko_internal_hoist__countByName);
  const countDynamic = Marko._.hoist(
    () => __marko_internal_hoist__countDynamic,
  );
  const name = Marko._.hoist(() => __marko_internal_hoist__name);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./tags/counter.marko"),
  ).default;
  {
    const count = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_tag_1,
    )()()({
      start: 1,
    });
    const __marko_internal_tag_2 = Marko._.resolveTemplate(
      import("./tags/counter.marko"),
    ).default;
    Marko._.renderTemplate(__marko_internal_tag_2)()()({
      start: "bad",
    });
    const __marko_internal_tag_3 = Counter;
    {
      const countByName = Marko._.returned(() => __marko_internal_rendered_3);
      const __marko_internal_rendered_3 = Marko._.renderDynamicTag(
        __marko_internal_tag_3,
      )()()({
        start: 2,
      });
      const __marko_internal_tag_4 = Counter;
      {
        const countDynamic = Marko._.returned(
          () => __marko_internal_rendered_4,
        );
        const __marko_internal_rendered_4 = Marko._.renderDynamicTag(
          __marko_internal_tag_4,
        )()()({
          start: 3,
        });
        const __marko_internal_tag_5 = Marko._.resolveTemplate(
          import("./tags/generic.marko"),
        ).default;
        Marko._.renderTemplate(__marko_internal_tag_5)()()({
          value: "x",
          ["content"]: (item) => {
            [item];
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_6 = Generic;
        Marko._.renderDynamicTag(__marko_internal_tag_6)()()({
          value: 1,
          //                         ^?
          ["content"]: (item) => {
            [item];
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_7 = JsTags;
        {
          const name = Marko._.returned(() => __marko_internal_rendered_7);
          const __marko_internal_rendered_7 = Marko._.renderDynamicTag(
            __marko_internal_tag_7,
          )()()(
            //                          ^?
            {
              name: "x",
            },
          );
          Marko._.renderNativeTag("div")()()({
            ["content"]: (() => {
              [count];
              [countByName];
              [countDynamic];
              [name];
              return () => {
                return Marko._.voidReturn;
              };
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
  return;
})();
class Template extends Marko._.Template<Input> {}
export default new Template();
//      ^?      ^?             ^?              ^?
