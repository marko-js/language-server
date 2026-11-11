const users = [{ name: "a" }, { name: "b" }];
const cols = ["x", "y"];
const flag = Math.random() > 0.5;
// A wrong value in a <while>: reported from its attribute tag
let n = 0;
declare const body: Marko.Body;
declare const render: Marko.Body<
  [number, { item?: Marko.AttrTag<{ size?: string }> }]
>;
declare const tpl: Marko.Template;
// A body that takes `unknown` takes any attribute tag, as it takes any
// attribute
declare const anyBody: Marko.Body<[unknown]>;
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
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1)(Marko._.withRestAttrTags)()(
    // In the attributes and an attribute tag
    {
      size: "huge",
      item: {
        size: "small",
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
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_2)(Marko._.withRestAttrTags)()(
    // In two attribute tags
    {
      item: {
        size: "huge",
        [Marko._.contentFor(__marko_internal_tag_2)]: ({ foo }) => {
          foo;
          return Marko._.voidReturn;
        },
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
  const __marko_internal_tag_3 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_3)(Marko._.withRestAttrTags)()(
    // In an attribute tag and one in an <if>
    {
      item: {
        bogus: 1,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              item: {
                size: "tiny",
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
    },
  );
  const __marko_internal_tag_4 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_4)(Marko._.withRestAttrTags)()(
    // In an attribute tag with params, beside an <if>
    {
      item: {
        bogus: 1,
        [Marko._.contentFor(__marko_internal_tag_4)]: ({ foo }) => {
          foo;
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        //                          ^?
        flag
          ? {
              item: {
                size: "large",
                [Marko._.contentFor(__marko_internal_tag_4)]: ({ foo }) => {
                  foo;
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
    },
  );
  Marko._.renderNativeTag("div")(Marko._.withRestAttrTags)()(
    // On a native tag
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
  const __marko_internal_tag_5 = Marko._.resolveTemplate(
    import("./tags/gtable/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@column"];
  });
  Marko._.renderTemplate(__marko_internal_tag_5)(Marko._.withRestAttrTags)()(
    // An error in the input and one in a <for>
    {
      rows: users,
      caption: 1,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_tag_5)([
              {
                column: {
                  title: 2,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("column"),
    },
  );
  const __marko_internal_tag_6 = Marko._.resolveTemplate(
    import("./tags/gtable/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@column"];
  });
  Marko._.renderTemplate(__marko_internal_tag_6)(Marko._.withRestAttrTags)()(
    // Unknown attribute in a <for> on a generic tag
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_tag_6)([
              {
                column: {
                  title: c,
                  bogus: 1,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("column"),
    },
  );
  const __marko_internal_tag_7 = Marko._.resolveTemplate(
    import("./tags/gtable/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@column"];
  });
  Marko._.renderTemplate(__marko_internal_tag_7)(Marko._.withRestAttrTags)()(
    // Wrong value in a <for> on a generic tag
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_tag_7)([
              {
                column: {
                  title: 1,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("column"),
    },
  );
  const __marko_internal_tag_8 = Marko._.resolveTemplate(
    import("./tags/gtable/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_8, (input) => {
    input["@column"];
  });
  Marko._.renderTemplate(__marko_internal_tag_8)(Marko._.withRestAttrTags)()(
    // Missing attribute in a <for> on a generic tag
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_tag_8)([
              {
                column: {
                  width: 1,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("column"),
    },
  );
  const __marko_internal_tag_9 = Marko._.resolveTemplate(
    import("./tags/gtable/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_9, (input) => {
    input["@colum"];
  });
  Marko._.renderTemplate(__marko_internal_tag_9)(Marko._.withRestAttrTags)()(
    // Unknown attribute tag name in a <for> on a generic tag
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_tag_9)([
              {
                colum: {
                  title: c,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("colum"),
    },
  );
  const __marko_internal_tag_10 = Marko._.resolveTemplate(
    import("./tags/sel/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_10)(Marko._.withRestAttrTags)()(
    // A static occurrence and a <for> disagree on T
    {
      option: {
        value: "a",
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: [1, 2],
          },
          (n) =>
            Marko._.attrTags(__marko_internal_tag_10)([
              {
                option: {
                  value: n,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
    },
  );
  const __marko_internal_tag_11 = Marko._.resolveTemplate(
    import("./tags/plain/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_11, (input) => {
    input["@footer"];
  });
  Marko._.renderTemplate(__marko_internal_tag_11)()()(
    // An attribute tag declared as a plain object (not `Marko.AttrTag`): reported
    // once and in an <if>, as main reports one written once
    {
      footer: {
        label: "a",
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  const __marko_internal_tag_12 = Marko._.resolveTemplate(
    import("./tags/plain/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_12, (input) => {
    input["@footer"];
  });
  Marko._.renderTemplate(__marko_internal_tag_12)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      flag
        ? {
            footer: {
              label: "a",
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("footer"),
  });
  const __marko_internal_tag_13 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_13, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_13)<2>()<string>()(
    // Type arguments on a tag that takes none, with repeated attribute tags
    {
      item: {
        size: "small",
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          item: {
            size: "large",
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  const __marko_internal_tag_14 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_14, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_14)(Marko._.withRestAttrTags)()(
    // A wrong value only an <else> gives: reported from its attribute tag
    {
      item: {
        size: "small",
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? (() => {
              console.log(flag);
              return Marko._.never;
            })()
          : {
              item: {
                size: "huge",
                [Symbol.iterator]: Marko._.any,
              },
            },
      ],
    },
  );
  const __marko_internal_tag_15 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_15, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_15)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      n++ < 2
        ? {
            item: {
              size: "huge",
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_16 = body;
  Marko._.attrTagNames(__marko_internal_tag_16, (input) => {
    input["@x"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_16)(Marko._.withRestAttrTags)()(
    // A body that takes no input, given attribute tags in a <for>
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          () =>
            Marko._.attrTags(__marko_internal_tag_16)([
              {
                x: {
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("x"),
    },
  );
  const __marko_internal_tag_17 = render;
  Marko._.attrTagNames(__marko_internal_tag_17, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_17)()()(
    // A tag with arguments takes its attributes after them: its attribute tags
    // are not checked against its first argument
    1,
    {
      ...Marko._.attrTags(Marko._.any)([
        {
          item: {
            size: "a",
            [Symbol.iterator]: Marko._.any,
          },
        },
        {
          item: {
            size: "b",
            [Symbol.iterator]: Marko._.any,
          },
        },
      ]),
    },
  );
  const __marko_internal_tag_18 = tpl;
  Marko._.attrTagNames(__marko_internal_tag_18, (input) => {
    input["@a"];
    input["@a"];
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_18)(Marko._.withRestAttrTags)()(
    // A template whose input is not known takes any attribute tag, also in an <if>
    // or a <for>
    {
      a: {
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              a: {
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
        Marko._.forOfAttrTag(
          {
            of: [1, 2],
          },
          () =>
            Marko._.attrTags(__marko_internal_tag_18)([
              {
                a: {
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
    },
  );
  const __marko_internal_tag_19 = anyBody;
  Marko._.attrTagNames(__marko_internal_tag_19, (input) => {
    input["@a"];
    input["@a"];
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_19)(Marko._.withRestAttrTags)()(
    {
      a: {
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              a: {
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
                a: {
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
    },
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
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
