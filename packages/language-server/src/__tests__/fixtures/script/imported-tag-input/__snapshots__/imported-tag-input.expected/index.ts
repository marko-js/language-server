import Flat from "./tags/flat-tag/index.marko";
import Gen from "./tags/gen-tag/index.marko";
import Rec from "./tags/rec-tag/index.marko";
import ShortFlat from "./tags/flat-tag/index.marko";
export interface Input {}
export type Component = Marko.Component<Input>;
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const discovered = Marko._.hoist(() => __marko_internal_hoist__discovered);
  const imported = Marko._.hoist(() => __marko_internal_hoist__imported);
  const dynamic = Marko._.hoist(() => __marko_internal_hoist__dynamic);
  const discoveredHoisted = Marko._.hoist(
    () => __marko_internal_hoist__discoveredHoisted,
  );
  const importedHoisted = Marko._.hoist(
    () => __marko_internal_hoist__importedHoisted,
  );
  const dynamicHoisted = Marko._.hoist(
    () => __marko_internal_hoist__dynamicHoisted,
  );
  const flag = Math.random() > 0.5;
  Marko._.renderTemplate(__marko_internal_module_1().default)()()(
    // Each tag is rendered by its discovered name, as an imported identifier,
    // by the `import X from "<x>"` shorthand and as `<${X}>`: all report the same.
    // An attribute the tag does not have
    {
      title: "x",
      bogus: 1,
    },
  );
  const __marko_internal_tag_1 = Flat;
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()({
    title: "x",
    bogus: 1,
  });
  const __marko_internal_tag_2 = ShortFlat;
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
    title: "x",
    bogus: 1,
  });
  const __marko_internal_tag_3 = Flat;
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
    title: "x",
    bogus: 1,
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@nope"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)()()(
    // An attribute tag the tag does not have
    {
      title: "x",
      nope: {
        title: "a",
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  const __marko_internal_tag_4 = Flat;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@nope"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_4)()()({
    title: "x",
    nope: {
      title: "a",
      [Symbol.iterator]: Marko._.any,
    },
  });
  const __marko_internal_tag_5 = Flat;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@nope"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_5)()()({
    title: "x",
    nope: {
      title: "a",
      [Symbol.iterator]: Marko._.any,
    },
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)()()(
    // A missing attribute
    {
      count: 1,
    },
  );
  const __marko_internal_tag_6 = Flat;
  Marko._.renderDynamicTag(__marko_internal_tag_6)()()({
    count: 1,
  });
  const __marko_internal_tag_7 = Flat;
  Marko._.renderDynamicTag(__marko_internal_tag_7)()()({
    count: 1,
  });
  {
    const discovered = Marko._.returned(() => __marko_internal_rendered_8);
    const __marko_internal_rendered_8 = Marko._.renderTemplate(
      __marko_internal_module_1().default,
    )()()(
      // The tag var
      {
        title: "x",
      },
    );
    const __marko_internal_tag_9 = Flat;
    {
      const imported = Marko._.returned(() => __marko_internal_rendered_9);
      const __marko_internal_rendered_9 = Marko._.renderDynamicTag(
        __marko_internal_tag_9,
      )()()({
        title: "x",
      });
      const __marko_internal_tag_10 = Flat;
      {
        const dynamic = Marko._.returned(() => __marko_internal_rendered_10);
        const __marko_internal_rendered_10 = Marko._.renderDynamicTag(
          __marko_internal_tag_10,
        )()()({
          title: "x",
        });
        Marko._.renderTemplate(__marko_internal_module_2().default)()()({
          async [Marko._.never]() {
            discovered;
            // ^?
            imported;
            // ^?
            dynamic;
            // ^?
          },
        });
        Marko._.renderTemplate(__marko_internal_module_3().default)()()({
          items: [{ id: "a" }],
          // A generic tag infers its params
          [Marko._.contentFor(__marko_internal_module_3)]: ({ item }) => {
            [item.id];
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_11 = Gen;
        Marko._.renderDynamicTag(__marko_internal_tag_11)()()({
          items: [{ id: "b" }],
          [Marko._.contentFor(__marko_internal_tag_11)]: ({ item }) => {
            [item.id];
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_12 = Gen;
        Marko._.renderDynamicTag(__marko_internal_tag_12)()()({
          items: [{ id: "c" }],
          [Marko._.contentFor(__marko_internal_tag_12)]: ({ item }) => {
            [item.id];
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_rendered_13 = Marko._.renderTemplate(
          __marko_internal_module_3().default,
        )()()({
          items: [{ id: "d" }],
          // A var hoisted from its body
          [Marko._.contentFor(__marko_internal_module_3)]: ({ item }) => {
            {
              const discoveredHoisted = Marko._.returned(
                () => __marko_internal_rendered_14,
              );
              const __marko_internal_rendered_14 = Marko._.renderTemplate(
                __marko_internal_module_4().default,
              )()()({
                value: () => item,
              });
              return new (class MarkoReturn<Return = void> {
                readonly [Marko._.scope] = { discoveredHoisted };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            }
          },
        });
        const __marko_internal_tag_15 = Gen;
        const __marko_internal_rendered_15 = Marko._.renderDynamicTag(
          __marko_internal_tag_15,
        )()()({
          items: [{ id: "e" }],
          [Marko._.contentFor(__marko_internal_tag_15)]: ({ item }) => {
            {
              const importedHoisted = Marko._.returned(
                () => __marko_internal_rendered_16,
              );
              const __marko_internal_rendered_16 = Marko._.renderTemplate(
                __marko_internal_module_4().default,
              )()()({
                value: () => item,
              });
              return new (class MarkoReturn<Return = void> {
                readonly [Marko._.scope] = { importedHoisted };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            }
          },
        });
        const __marko_internal_tag_17 = Gen;
        const __marko_internal_rendered_17 = Marko._.renderDynamicTag(
          __marko_internal_tag_17,
        )()()({
          items: [{ id: "f" }],
          [Marko._.contentFor(__marko_internal_tag_17)]: ({ item }) => {
            {
              const dynamicHoisted = Marko._.returned(
                () => __marko_internal_rendered_18,
              );
              const __marko_internal_rendered_18 = Marko._.renderTemplate(
                __marko_internal_module_4().default,
              )()()({
                value: () => item,
              });
              return new (class MarkoReturn<Return = void> {
                readonly [Marko._.scope] = { dynamicHoisted };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            }
          },
        });
        Marko._.renderTemplate(__marko_internal_module_2().default)()()({
          async [Marko._.never]() {
            discoveredHoisted;
            // ^?
            importedHoisted;
            // ^?
            dynamicHoisted;
            // ^?
          },
        });
        Marko._.attrTagNames(__marko_internal_module_5, (input) => {
          input["@group"];
          Marko._.nestedAttrTagNames(input["@group"], (input) => {
            input["@group"];
          });
        });
        Marko._.renderTemplate(__marko_internal_module_5().default)()()(
          // A recursive attribute tag
          {
            title: "a",
            group: {
              title: "b",
              group: {
                title: "c",
                bogus: 1,
                [Symbol.iterator]: Marko._.any,
              },
              [Symbol.iterator]: Marko._.any,
            },
          },
        );
        const __marko_internal_tag_19 = Rec;
        Marko._.attrTagNames(__marko_internal_tag_19, (input) => {
          input["@group"];
          Marko._.nestedAttrTagNames(input["@group"], (input) => {
            input["@group"];
          });
        });
        Marko._.renderDynamicTag(__marko_internal_tag_19)()()({
          title: "a",
          group: {
            title: "b",
            group: {
              title: "c",
              bogus: 1,
              [Symbol.iterator]: Marko._.any,
            },
            [Symbol.iterator]: Marko._.any,
          },
        });
        const __marko_internal_tag_20 = Rec;
        Marko._.attrTagNames(__marko_internal_tag_20, (input) => {
          input["@group"];
          Marko._.nestedAttrTagNames(input["@group"], (input) => {
            input["@group"];
          });
        });
        Marko._.renderDynamicTag(__marko_internal_tag_20)()()({
          title: "a",
          group: {
            title: "b",
            group: {
              title: "c",
              bogus: 1,
              [Symbol.iterator]: Marko._.any,
            },
            [Symbol.iterator]: Marko._.any,
          },
        });
        Marko._.renderTemplate(__marko_internal_module_5().default)()()({});
        const __marko_internal_tag_21 = Rec;
        Marko._.renderDynamicTag(__marko_internal_tag_21)()()({});
        const __marko_internal_tag_22 = Rec;
        Marko._.renderDynamicTag(__marko_internal_tag_22)()()({});
        Marko._.renderTemplate(__marko_internal_module_3().default)<0>()<{
          id: string;
        }>()({
          items: [{ id: 1 }],
          // Type args
          [Marko._.contentFor(__marko_internal_module_3)]: ({ item }) => {
            [item.id];
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_23 = Gen;
        Marko._.renderDynamicTag(__marko_internal_tag_23)<0>()<{
          id: string;
        }>()({
          items: [{ id: 1 }],
          [Marko._.contentFor(__marko_internal_tag_23)]: ({ item }) => {
            [item.id];
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_24 = flag ? Flat : Rec;
        Marko._.renderDynamicTag(__marko_internal_tag_24)()()(
          // A name that is one of several tags takes any of their inputs (and does not
          // report unknown attributes)
          {
            title: "x",
            bogus: 1,
          },
        );
        const __marko_internal_tag_25 = flag ? Flat : "div";
        Marko._.renderDynamicTag(__marko_internal_tag_25)()()({
          title: "x",
        });
        const __marko_internal_tag_26 = flag ? Flat : Gen;
        Marko._.renderDynamicTag(__marko_internal_tag_26)()()({
          title: "x",
        });
        var __marko_internal_hoist__discovered = discovered;
        var __marko_internal_hoist__imported = imported;
        var __marko_internal_hoist__dynamic = dynamic;
        var {
          discoveredHoisted: __marko_internal_hoist__discoveredHoisted,
          importedHoisted: __marko_internal_hoist__importedHoisted,
          dynamicHoisted: __marko_internal_hoist__dynamicHoisted,
        } = Marko._.hoisted(
          Marko._.readScopes({
            __marko_internal_rendered_13,
            __marko_internal_rendered_15,
            __marko_internal_rendered_17,
          }),
        );
      }
    }
  }
  Marko._.noop({
    discovered,
    imported,
    dynamic,
    discoveredHoisted,
    importedHoisted,
    dynamicHoisted,
    component,
    state,
    out,
    input,
    $global,
    $signal,
  });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./tags/flat-tag/index.marko");
declare function __marko_internal_module_2(): typeof import("marko/src/core-tags/core/script.d.marko");
declare function __marko_internal_module_3(): typeof import("./tags/gen-tag/index.marko");
declare function __marko_internal_module_4(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_5(): typeof import("./tags/rec-tag/index.marko");
