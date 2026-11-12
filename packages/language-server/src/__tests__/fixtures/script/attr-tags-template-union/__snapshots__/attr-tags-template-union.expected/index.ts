import Flat from "./tags/flat/index.marko";
import Menu from "./tags/menu/index.marko";
import ClassMenu from "./components/class-menu.marko";
const flag = Math.random() > 0.5;
const FlatOrMenu = flag ? Flat : Menu;
// One of several native tags, which have no attribute tags
declare const native: "a" | "div";
export interface Input {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const fromUnion = Marko._.hoist(() => __marko_internal_hoist__fromUnion);
  const __marko_internal_tag_1 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()(
    // One attribute tag
    {
      item: {
        size: "small",
        [Marko._.contentFor(__marko_internal_tag_1)]: ({ foo }) => {
          foo;
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  const __marko_internal_tag_2 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_2)(Marko._.withRestAttrTags)()(
    // Repeated
    {
      item: {
        size: "small",
        [Marko._.contentFor(__marko_internal_tag_2)]: ({ foo }) => {
          foo;
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          //                               ^?
          item: {
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  const __marko_internal_tag_3 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_3)(Marko._.withRestAttrTags)()(
    // In an if
    {
      [Marko._.restAttrTags]: [
        flag
          ? {
              item: {
                size: "small",
                [Marko._.contentFor(__marko_internal_tag_3)]: ({ foo }) => {
                  foo;
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
      ...Marko._.givenAttrTags("item"),
    },
  );
  const __marko_internal_tag_4 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_4)(Marko._.withRestAttrTags)()(
    // In a for
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: [1, 2],
          },
          (i) =>
            Marko._.attrTags(__marko_internal_tag_4)([
              {
                item: {
                  size: "small",
                  [Marko._.contentFor(__marko_internal_tag_4)]: ({ foo }) => {
                    i;
                    foo;
                    return Marko._.voidReturn;
                  },
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("item"),
    },
  );
  const __marko_internal_tag_5 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  Marko._.renderDynamicTag(__marko_internal_tag_5)()()(
    // Nested, repeated
    {
      item: {
        ...Marko._.givenAttrTags("row"),
        ...Marko._.attrTags(
          __marko_internal_tag_5,
          "item",
        )([
          {
            row: {
              [Marko._.contentFor(__marko_internal_tag_5)]: ({ bar }) => {
                bar;
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            //                   ^?
            row: {
              [Symbol.iterator]: Marko._.any,
            },
          },
        ]),
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  const __marko_internal_tag_6 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_6)(Marko._.withRestAttrTags)()(
    // Wrong values
    {
      item: {
        size: "huge",
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          item: {
            bogus: 1,
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  const __marko_internal_tag_7 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@item"];
    input["@item"];
  });
  const __marko_internal_rendered_7 = Marko._.renderDynamicTag(
    __marko_internal_tag_7,
  )(Marko._.withRestAttrTags)()(
    // Hoisted from a rest attribute tag
    {
      item: {
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              item: {
                [Marko._.contentFor(__marko_internal_tag_7)]: (() => {
                  const __marko_internal_tag_8 = Marko._.resolveTemplate(
                    import("@marko/runtime-tags/tags/const.d.marko"),
                  ).default;
                  {
                    const fromUnion = Marko._.returned(
                      () => __marko_internal_rendered_8,
                    );
                    const __marko_internal_rendered_8 = Marko._.renderTemplate(
                      __marko_internal_tag_8,
                    )()()({
                      value: () => "union" as const,
                    });
                    return () => {
                      return new (class MarkoReturn<Return = void> {
                        readonly [Marko._.scope] = { fromUnion };
                        declare return: Return;
                        constructor(_?: Return) {}
                      })();
                    };
                  }
                })(),
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
    },
  );
  const __marko_internal_tag_9 = Marko._.resolveTemplate(
    import("marko/src/core-tags/core/script.d.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_9)()()({
    async value() {
      fromUnion;
      // ^?
    },
  });
  const __marko_internal_tag_10 = native;
  Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_10)(Marko._.withRestAttrTags)()(
    {
      item: {
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          item: {
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  const __marko_internal_tag_11 = flag ? ClassMenu : "div";
  Marko._.attrTagNames(__marko_internal_tag_11, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_11)(Marko._.withRestAttrTags)()(
    // A template or a native tag: typed by the template (where both name their
    // content alike; `Menu`'s is `content`, a native tag's here `renderBody`)
    {
      [Marko._.restAttrTags]: [
        flag
          ? {
              item: {
                label: "a",
                [Marko._.contentFor(__marko_internal_tag_11)]: (n) => {
                  n;
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
      ...Marko._.givenAttrTags("item"),
    },
  );
  var { fromUnion: __marko_internal_hoist__fromUnion } = Marko._.hoisted(
    Marko._.readScope(__marko_internal_rendered_7),
  );
  Marko._.noop({ fromUnion, input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
export default new (class Template extends Marko._.Template<{
  render(
    input: Marko.TemplateInput<Input>,
    stream?: {
      write: (chunk: string) => void;
      end: (chunk?: string) => void;
    },
  ): Marko.Out<never>;

  render(
    input: Marko.TemplateInput<Input>,
    cb?: (err: Error | null, result: Marko.RenderResult<never>) => void,
  ): Marko.Out<never>;

  renderSync(input: Marko.TemplateInput<Input>): Marko.RenderResult<never>;

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
  ): () => A extends 2 | 3
    ? Marko._.RestAttrTagsRenderer<Input, void>
    : <I>(
        input: Marko.Directives &
          Input &
          Marko._.Relate<I, Marko.Directives & Input>,
      ) => Marko._.ReturnWithScope<I, void>;
}> {})();
