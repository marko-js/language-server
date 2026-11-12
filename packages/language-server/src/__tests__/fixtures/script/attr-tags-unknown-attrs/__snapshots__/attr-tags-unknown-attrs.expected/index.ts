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
  const fromItem = Marko._.hoist(() => __marko_internal_hoist__fromItem);
  const flag = Math.random() > 0.5;
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1)()()({
    item: {
      size: "small",
      bogus: 1,
      [Marko._.contentFor(__marko_internal_tag_1)]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_2)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a", "b"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_tag_2)([
            {
              item: {
                size: "small",
                bogus: 1,
                [Marko._.contentFor(__marko_internal_tag_2)]: ({ foo }) => {
                  [name];
                  [foo];
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_3 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_3)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forInAttrTag(
        {
          in: { a: 1 },
        },
        (key) =>
          Marko._.attrTags(__marko_internal_tag_3)([
            {
              item: {
                bogus: 1,
                [Marko._.contentFor(__marko_internal_tag_3)]: ({ foo }) => {
                  [key];
                  [foo];
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_4 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_4)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forToAttrTag(
        {
          to: 2,
        },
        (i) =>
          Marko._.attrTags(__marko_internal_tag_4)([
            {
              item: {
                bogus: 1,
                [Marko._.contentFor(__marko_internal_tag_4)]: ({ foo }) => {
                  [i];
                  [foo];
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_5 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_5)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forUntilAttrTag(
        {
          until: 2,
        },
        (i) =>
          Marko._.attrTags(__marko_internal_tag_5)([
            {
              item: {
                bogus: 1,
                [Marko._.contentFor(__marko_internal_tag_5)]: ({ foo }) => {
                  [i];
                  [foo];
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_6 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_6)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_tag_6)([
            flag
              ? {
                  item: {
                    bogus: 1,
                    [Marko._.contentFor(__marko_internal_tag_6)]: ({ foo }) => {
                      [name];
                      [foo];
                      return Marko._.voidReturn;
                    },
                    [Symbol.iterator]: Marko._.any,
                  },
                }
              : Marko._.never,
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_7 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
    });
  });
  Marko._.renderTemplate(__marko_internal_tag_7)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_tag_7)([
            {
              item: {
                row: {
                  label: name,
                  bogus: 1,
                  [Symbol.iterator]: Marko._.any,
                },
                [Marko._.contentFor(__marko_internal_tag_7)]: ({ foo }) => {
                  [foo];
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_8 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_8, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
    });
  });
  Marko._.renderTemplate(__marko_internal_tag_8)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a", "b"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_tag_8)([
            {
              item: {
                size: "large",
                row: {
                  label: name,
                  [Symbol.iterator]: Marko._.any,
                },
                [Marko._.contentFor(__marko_internal_tag_8)]: ({ foo }) => {
                  [foo];
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_9 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_9, (input) => {
    input["@item"];
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_9)(Marko._.withRestAttrTags)()({
    item: {
      bogus: 1,
      [Marko._.contentFor(__marko_internal_tag_9)]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          bogus: 2,
          [Marko._.contentFor(__marko_internal_tag_9)]: ({ foo }) => {
            [foo];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
      flag
        ? {
            item: {
              bogus: 3,
              [Marko._.contentFor(__marko_internal_tag_9)]: ({ foo }) => {
                [foo];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
  });
  const __marko_internal_tag_10 = Marko._.resolveTemplate(
    import("./tags/empty/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
    input["@a"];
    input["@a"];
  });
  Marko._.renderTemplate(__marko_internal_tag_10)(Marko._.withRestAttrTags)()({
    a: {
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        a: {
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_11 = Marko._.resolveTemplate(
    import("./tags/empty/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_11, (input) => {
    input["@a"];
  });
  Marko._.renderTemplate(__marko_internal_tag_11)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1, 2],
        },
        (i) =>
          Marko._.attrTags(__marko_internal_tag_11)([
            {
              a: {
                x: i,
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("a"),
  });
  const __marko_internal_tag_12 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_12, (input) => {
    input["@nope"];
    Marko._.nestedAttrTagNames(input["@nope"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  Marko._.renderTemplate(__marko_internal_tag_12)()()({
    nope: {
      ...Marko._.givenAttrTags("row"),
      ...Marko._.attrTags(
        __marko_internal_tag_12,
        "nope",
      )([
        {
          row: {
            [Symbol.iterator]: Marko._.any,
          },
        },
        {
          row: {
            [Symbol.iterator]: Marko._.any,
          },
        },
      ]),
      [Symbol.iterator]: Marko._.any,
    },
  });
  const __marko_internal_tag_13 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_13, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_13)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      flag
        ? (() => {
            const bar = 1;
            return Marko._.attrTags(__marko_internal_tag_13)([
              {
                item: {
                  bogus: bar,
                  [Marko._.contentFor(__marko_internal_tag_13)]: ({ foo }) => {
                    [foo];
                    return Marko._.voidReturn;
                  },
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]);
          })()
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_14 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_14, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  const __marko_internal_rendered_14 = Marko._.renderTemplate(
    __marko_internal_tag_14,
  )()()(
    // An error in an attribute tag and one in its repeated attribute tags: both
    // reported, and the variable it hoists still typed
    {
      item: {
        size: "huge",
        ...Marko._.givenAttrTags("row"),
        ...Marko._.attrTags(
          __marko_internal_tag_14,
          "item",
        )([
          {
            row: {
              label: "a",
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            row: {
              label: 1,
              [Symbol.iterator]: Marko._.any,
            },
          },
        ]),
        [Marko._.contentFor(__marko_internal_tag_14)]: (() => {
          const __marko_internal_tag_15 = Marko._.resolveTemplate(
            import("@marko/runtime-tags/tags/const.d.marko"),
          ).default;
          {
            const fromItem = Marko._.returned(
              () => __marko_internal_rendered_15,
            );
            const __marko_internal_rendered_15 = Marko._.renderTemplate(
              __marko_internal_tag_15,
            )()()({
              value: () => "s",
            });
            return () => {
              return new (class MarkoReturn<Return = void> {
                readonly [Marko._.scope] = { fromItem };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            };
          }
        })(),
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  const __marko_internal_tag_16 = Marko._.resolveTemplate(
    import("marko/src/core-tags/core/script.d.marko"),
  ).default;
  Marko._.renderTemplate(__marko_internal_tag_16)()()({
    async [Marko._.never]() {
      fromItem;
      //^?
    },
  });
  const __marko_internal_tag_17 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_17, (input) => {
    input["@itme"];
  });
  Marko._.renderTemplate(__marko_internal_tag_17)(Marko._.withRestAttrTags)()(
    // An unknown attribute tag name only a <for> gives: reported once, at it
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: ["a", "b"],
          },
          (name) =>
            Marko._.attrTags(__marko_internal_tag_17)([
              {
                itme: {
                  label: name,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("itme"),
    },
  );
  const __marko_internal_tag_18 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_18, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  Marko._.renderTemplate(__marko_internal_tag_18)(Marko._.withRestAttrTags)()(
    // Errors in two groups of an attribute tag's attribute tags, in a <for>: each
    // reported at it, and not its attributes ("specified more than once")
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: ["a", "b"],
          },
          (name) =>
            Marko._.attrTags(__marko_internal_tag_18)([
              {
                item: {
                  size: "small",
                  ...Marko._.givenAttrTags("row"),
                  ...Marko._.attrTags(
                    __marko_internal_tag_18,
                    "item",
                  )([
                    {
                      row: {
                        label: name,
                        bogus: 1,
                        [Symbol.iterator]: Marko._.any,
                      },
                    },
                    flag
                      ? {
                          row: {
                            label: 1,
                            [Symbol.iterator]: Marko._.any,
                          },
                        }
                      : Marko._.never,
                  ]),
                  [Marko._.contentFor(__marko_internal_tag_18)]: (() => {
                    [name];
                    return () => {
                      return Marko._.voidReturn;
                    };
                  })(),
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("item"),
    },
  );
  const __marko_internal_tag_19 = Marko._.resolveTemplate(
    import("./tags/unk/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_19, (input) => {
    input["@b"];
    input["@c"];
  });
  Marko._.renderTemplate(__marko_internal_tag_19)(Marko._.withRestAttrTags)()(
    // An input declared `unknown` takes no attribute tag, also in an <if> or a
    // <for>
    {
      [Marko._.restAttrTags]: [
        flag
          ? {
              b: {
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
        Marko._.forOfAttrTag(
          {
            of: [1, 2],
          },
          () =>
            Marko._.attrTags(__marko_internal_tag_19)([
              {
                c: {
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("b", "c"),
    },
  );
  var { fromItem: __marko_internal_hoist__fromItem } = Marko._.hoisted(
    Marko._.readScope(__marko_internal_rendered_14),
  );
  Marko._.noop({ fromItem, component, state, out, input, $global, $signal });
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
  ): () => A extends 2 | 3
    ? Marko._.RestAttrTagsRenderer<Input, void>
    : <I>(
        input: Marko.Directives &
          Input &
          Marko._.Relate<I, Marko.Directives & Input>,
      ) => Marko._.ReturnWithScope<I, void>;
}> {})();
