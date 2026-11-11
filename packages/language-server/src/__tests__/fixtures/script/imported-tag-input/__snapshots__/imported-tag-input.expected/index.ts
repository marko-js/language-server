import Flat from "./tags/flat-tag/index.marko";
import Gen from "./tags/gen-tag/index.marko";
import Rec from "./tags/rec-tag/index.marko";
import ShortFlat from "./tags/flat-tag/index.marko";
export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
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
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./tags/flat-tag/index.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_1)()()(
    // Each tag is rendered by its discovered name, as an imported identifier,
    // by the `import X from "<x>"` shorthand and as `<${X}>`: all report the same.
    // An attribute the tag does not have
    {
      title: "x",
      bogus: 1,
    },
  );
  const __marko_internal_tag_2 = Flat;
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()({
    title: "x",
    bogus: 1,
  });
  const __marko_internal_tag_3 = ShortFlat;
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
    title: "x",
    bogus: 1,
  });
  const __marko_internal_tag_4 = Flat;
  Marko._.renderDynamicTag(__marko_internal_tag_4)()()({
    title: "x",
    bogus: 1,
  });
  const __marko_internal_tag_5 = Marko._.resolveTemplate(
    import("./tags/flat-tag/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@nope"];
  });
  Marko._.renderTemplate(__marko_internal_tag_5)()()(
    // An attribute tag the tag does not have
    {
      title: "x",
      nope: {
        title: "a",
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  const __marko_internal_tag_6 = Flat;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@nope"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_6)()()({
    title: "x",
    nope: {
      title: "a",
      [Symbol.iterator]: Marko._.any,
    },
  });
  const __marko_internal_tag_7 = Flat;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@nope"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_7)()()({
    title: "x",
    nope: {
      title: "a",
      [Symbol.iterator]: Marko._.any,
    },
  });
  const __marko_internal_tag_8 = Marko._.resolveTemplate(
    import("./tags/flat-tag/index.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_8)()()(
    // A missing attribute
    {
      count: 1,
    },
  );
  const __marko_internal_tag_9 = Flat;
  Marko._.renderDynamicTag(__marko_internal_tag_9)()()({
    count: 1,
  });
  const __marko_internal_tag_10 = Flat;
  Marko._.renderDynamicTag(__marko_internal_tag_10)()()({
    count: 1,
  });
  const __marko_internal_tag_11 = Marko._.resolveTemplate(
    import("./tags/flat-tag/index.marko"),
  ).default;
  {
    const discovered = Marko._.returned(() => __marko_internal_rendered_11);
    const __marko_internal_rendered_11 = Marko._.renderTemplate(
      __marko_internal_tag_11,
    )()()(
      // The tag var
      {
        title: "x",
      },
    );
    const __marko_internal_tag_12 = Flat;
    {
      const imported = Marko._.returned(() => __marko_internal_rendered_12);
      const __marko_internal_rendered_12 = Marko._.renderDynamicTag(
        __marko_internal_tag_12,
      )()()({
        title: "x",
      });
      const __marko_internal_tag_13 = Flat;
      {
        const dynamic = Marko._.returned(() => __marko_internal_rendered_13);
        const __marko_internal_rendered_13 = Marko._.renderDynamicTag(
          __marko_internal_tag_13,
        )()()({
          title: "x",
        });
        const __marko_internal_tag_14 = Marko._.resolveTemplate(
          import("marko/src/core-tags/core/script.d.marko"),
        ).default;
        Marko._.renderTemplate(__marko_internal_tag_14)()()({
          async [Marko._.never]() {
            discovered;
            // ^?
            imported;
            // ^?
            dynamic;
            // ^?
          },
        });
        const __marko_internal_tag_15 = Marko._.resolveTemplate(
          import("./tags/gen-tag/index.marko"),
        ).default;
        Marko._.renderTemplate(__marko_internal_tag_15)()()({
          items: [{ id: "a" }],
          // A generic tag infers its params
          [Marko._.contentFor(__marko_internal_tag_15)]: ({ item }) => {
            item.id;
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_16 = Gen;
        Marko._.renderDynamicTag(__marko_internal_tag_16)()()({
          items: [{ id: "b" }],
          [Marko._.contentFor(__marko_internal_tag_16)]: ({ item }) => {
            item.id;
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_17 = Gen;
        Marko._.renderDynamicTag(__marko_internal_tag_17)()()({
          items: [{ id: "c" }],
          [Marko._.contentFor(__marko_internal_tag_17)]: ({ item }) => {
            item.id;
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_18 = Marko._.resolveTemplate(
          import("./tags/gen-tag/index.marko"),
        ).default;
        const __marko_internal_rendered_18 = Marko._.renderTemplate(
          __marko_internal_tag_18,
        )()()({
          items: [{ id: "d" }],
          // A var hoisted from its body
          [Marko._.contentFor(__marko_internal_tag_18)]: ({ item }) => {
            const __marko_internal_tag_19 = Marko._.resolveTemplate(
              import("@marko/runtime-tags/tags/const.d.marko"),
            ).default;
            {
              const discoveredHoisted = Marko._.returned(
                () => __marko_internal_rendered_19,
              );
              const __marko_internal_rendered_19 = Marko._.renderTemplate(
                __marko_internal_tag_19,
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
        const __marko_internal_tag_20 = Gen;
        const __marko_internal_rendered_20 = Marko._.renderDynamicTag(
          __marko_internal_tag_20,
        )()()({
          items: [{ id: "e" }],
          [Marko._.contentFor(__marko_internal_tag_20)]: ({ item }) => {
            const __marko_internal_tag_21 = Marko._.resolveTemplate(
              import("@marko/runtime-tags/tags/const.d.marko"),
            ).default;
            {
              const importedHoisted = Marko._.returned(
                () => __marko_internal_rendered_21,
              );
              const __marko_internal_rendered_21 = Marko._.renderTemplate(
                __marko_internal_tag_21,
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
        const __marko_internal_tag_22 = Gen;
        const __marko_internal_rendered_22 = Marko._.renderDynamicTag(
          __marko_internal_tag_22,
        )()()({
          items: [{ id: "f" }],
          [Marko._.contentFor(__marko_internal_tag_22)]: ({ item }) => {
            const __marko_internal_tag_23 = Marko._.resolveTemplate(
              import("@marko/runtime-tags/tags/const.d.marko"),
            ).default;
            {
              const dynamicHoisted = Marko._.returned(
                () => __marko_internal_rendered_23,
              );
              const __marko_internal_rendered_23 = Marko._.renderTemplate(
                __marko_internal_tag_23,
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
        const __marko_internal_tag_24 = Marko._.resolveTemplate(
          import("marko/src/core-tags/core/script.d.marko"),
        ).default;
        Marko._.renderTemplate(__marko_internal_tag_24)()()({
          async [Marko._.never]() {
            discoveredHoisted;
            // ^?
            importedHoisted;
            // ^?
            dynamicHoisted;
            // ^?
          },
        });
        const __marko_internal_tag_25 = Marko._.resolveTemplate(
          import("./tags/rec-tag/index.marko"),
        ).default;
        Marko._.attrTagNames(__marko_internal_tag_25, (input) => {
          input["@group"];
          Marko._.nestedAttrTagNames(input["@group"], (input) => {
            input["@group"];
          });
        });
        Marko._.renderTemplate(__marko_internal_tag_25)()()(
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
        const __marko_internal_tag_26 = Rec;
        Marko._.attrTagNames(__marko_internal_tag_26, (input) => {
          input["@group"];
          Marko._.nestedAttrTagNames(input["@group"], (input) => {
            input["@group"];
          });
        });
        Marko._.renderDynamicTag(__marko_internal_tag_26)()()({
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
        const __marko_internal_tag_27 = Rec;
        Marko._.attrTagNames(__marko_internal_tag_27, (input) => {
          input["@group"];
          Marko._.nestedAttrTagNames(input["@group"], (input) => {
            input["@group"];
          });
        });
        Marko._.renderDynamicTag(__marko_internal_tag_27)()()({
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
        const __marko_internal_tag_28 = Marko._.resolveTemplate(
          import("./tags/rec-tag/index.marko"),
        ).default;
        Marko._.renderTemplate(__marko_internal_tag_28)()()({});
        const __marko_internal_tag_29 = Rec;
        Marko._.renderDynamicTag(__marko_internal_tag_29)()()({});
        const __marko_internal_tag_30 = Rec;
        Marko._.renderDynamicTag(__marko_internal_tag_30)()()({});
        const __marko_internal_tag_31 = Marko._.resolveTemplate(
          import("./tags/gen-tag/index.marko"),
        ).default;
        Marko._.renderTemplate(__marko_internal_tag_31)<0>()<{ id: string }>()({
          items: [{ id: 1 }],
          // Type args
          [Marko._.contentFor(__marko_internal_tag_31)]: ({ item }) => {
            item.id;
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_32 = Gen;
        Marko._.renderDynamicTag(__marko_internal_tag_32)<0>()<{
          id: string;
        }>()({
          items: [{ id: 1 }],
          [Marko._.contentFor(__marko_internal_tag_32)]: ({ item }) => {
            item.id;
            return Marko._.voidReturn;
          },
        });
        const __marko_internal_tag_33 = flag ? Flat : Rec;
        Marko._.renderDynamicTag(__marko_internal_tag_33)()()(
          // A name that is one of several tags takes any of their inputs (and does not
          // report unknown attributes)
          {
            title: "x",
            bogus: 1,
          },
        );
        const __marko_internal_tag_34 = flag ? Flat : "div";
        Marko._.renderDynamicTag(__marko_internal_tag_34)()()({
          title: "x",
        });
        const __marko_internal_tag_35 = flag ? Flat : Gen;
        Marko._.renderDynamicTag(__marko_internal_tag_35)()()({
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
            __marko_internal_rendered_18,
            __marko_internal_rendered_20,
            __marko_internal_rendered_22,
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
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<Component>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<Component>) => void,
  ): Marko.Out<Component>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<Component>;

  renderToString(input: Marko.TemplateInput<Input>): string;

  stream(
    input: Marko.TemplateInput<Input>,
  ): ReadableStream<string> & NodeJS.ReadableStream;

  mount(
    input: Marko.TemplateInput<Input>,
    reference: Node,
    position?: "afterbegin" | "afterend" | "beforebegin" | "beforeend",
  ): Marko.MountedTemplate<typeof input, void>;

  api: typeof __marko_internal_api;
  _<A = 1>(
    m?: A,
  ): () => A extends 3
    ? Marko._.RestAttrTagsRenderer<Input, void>
    : <I>(
        input: Marko.Directives &
          Input &
          Marko._.Relate<I, Marko.Directives & Input>,
      ) => Marko._.ReturnWithScope<I, void>;
}> {})();
