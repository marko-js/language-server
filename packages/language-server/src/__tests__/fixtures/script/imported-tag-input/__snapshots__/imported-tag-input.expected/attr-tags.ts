import Menu from "./tags/menu-tag/index.marko";
import Pick from "./tags/pick-tag/index.marko";
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
  const flag = Math.random() > 0.5;
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./tags/menu-tag/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1)(Marko._.withRestAttrTags)()(
    // Each tag is rendered by its discovered name, as an imported identifier and
    // as `<${X}>`: all report the same.
    // Repeated
    {
      bogus: 1,
      item: {
        size: "small",
        [Marko._.contentFor(__marko_internal_tag_1)]: ({ foo }) => {
          [foo];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          item: {
            [Marko._.contentFor(__marko_internal_tag_1)]: ({ foo }) => {
              [foo];
              return Marko._.voidReturn;
            },
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  const __marko_internal_tag_2 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_2)(Marko._.withRestAttrTags)()({
    bogus: 1,
    item: {
      size: "small",
      [Marko._.contentFor(__marko_internal_tag_2)]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          [Marko._.contentFor(__marko_internal_tag_2)]: ({ foo }) => {
            [foo];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_3 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_3)(Marko._.withRestAttrTags)()({
    bogus: 1,
    item: {
      size: "small",
      [Marko._.contentFor(__marko_internal_tag_3)]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          [Marko._.contentFor(__marko_internal_tag_3)]: ({ foo }) => {
            [foo];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_4 = Marko._.resolveTemplate(
    import("./tags/menu-tag/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_4)(Marko._.withRestAttrTags)()(
    // In an if
    {
      bogus: 1,
      [Marko._.restAttrTags]: [
        flag
          ? {
              item: {
                size: "small",
                [Marko._.contentFor(__marko_internal_tag_4)]: ({ foo }) => {
                  [foo];
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
  const __marko_internal_tag_5 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_5)(Marko._.withRestAttrTags)()({
    bogus: 1,
    [Marko._.restAttrTags]: [
      flag
        ? {
            item: {
              size: "small",
              [Marko._.contentFor(__marko_internal_tag_5)]: ({ foo }) => {
                [foo];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_6 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_6)(Marko._.withRestAttrTags)()({
    bogus: 1,
    [Marko._.restAttrTags]: [
      flag
        ? {
            item: {
              size: "small",
              [Marko._.contentFor(__marko_internal_tag_6)]: ({ foo }) => {
                [foo];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("item"),
  });
  const __marko_internal_tag_7 = Marko._.resolveTemplate(
    import("./tags/menu-tag/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_7)(Marko._.withRestAttrTags)()(
    // In a for
    {
      bogus: 1,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: ["a", "b"],
          },
          (name) =>
            Marko._.attrTags(__marko_internal_tag_7)([
              {
                item: {
                  [Marko._.contentFor(__marko_internal_tag_7)]: ({ foo }) => {
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
    },
  );
  const __marko_internal_tag_8 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_8, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_8)(Marko._.withRestAttrTags)()({
    bogus: 1,
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a", "b"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_tag_8)([
            {
              item: {
                [Marko._.contentFor(__marko_internal_tag_8)]: ({ foo }) => {
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
  const __marko_internal_tag_9 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_9, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_9)(Marko._.withRestAttrTags)()({
    bogus: 1,
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a", "b"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_tag_9)([
            {
              item: {
                [Marko._.contentFor(__marko_internal_tag_9)]: ({ foo }) => {
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
  const __marko_internal_tag_10 = Marko._.resolveTemplate(
    import("./tags/menu-tag/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
    input["@item"];
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_10)(Marko._.withRestAttrTags)()(
    // An attribute the attribute tags do not have
    {
      item: {
        bogus: 1,
        [Marko._.contentFor(__marko_internal_tag_10)]: ({ foo }) => {
          [foo];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              item: {
                bogus: 2,
                [Marko._.contentFor(__marko_internal_tag_10)]: ({ foo }) => {
                  [foo];
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
        Marko._.forOfAttrTag(
          {
            of: ["a", "b"],
          },
          (name) =>
            Marko._.attrTags(__marko_internal_tag_10)([
              {
                item: {
                  size: "tiny",
                  [Marko._.contentFor(__marko_internal_tag_10)]: ({ foo }) => {
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
    },
  );
  const __marko_internal_tag_11 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_11, (input) => {
    input["@item"];
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_11)(Marko._.withRestAttrTags)()(
    {
      item: {
        bogus: 1,
        [Marko._.contentFor(__marko_internal_tag_11)]: ({ foo }) => {
          [foo];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              item: {
                bogus: 2,
                [Marko._.contentFor(__marko_internal_tag_11)]: ({ foo }) => {
                  [foo];
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
        Marko._.forOfAttrTag(
          {
            of: ["a", "b"],
          },
          (name) =>
            Marko._.attrTags(__marko_internal_tag_11)([
              {
                item: {
                  size: "tiny",
                  [Marko._.contentFor(__marko_internal_tag_11)]: ({ foo }) => {
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
    },
  );
  const __marko_internal_tag_12 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_12, (input) => {
    input["@item"];
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_12)(Marko._.withRestAttrTags)()(
    {
      item: {
        bogus: 1,
        [Marko._.contentFor(__marko_internal_tag_12)]: ({ foo }) => {
          [foo];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              item: {
                bogus: 2,
                [Marko._.contentFor(__marko_internal_tag_12)]: ({ foo }) => {
                  [foo];
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
        Marko._.forOfAttrTag(
          {
            of: ["a", "b"],
          },
          (name) =>
            Marko._.attrTags(__marko_internal_tag_12)([
              {
                item: {
                  size: "tiny",
                  [Marko._.contentFor(__marko_internal_tag_12)]: ({ foo }) => {
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
    },
  );
  const __marko_internal_tag_13 = Marko._.resolveTemplate(
    import("./tags/pick-tag/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_13, (input) => {
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_13)()()(
    // A generic tag's attribute tag
    {
      bogus: 1,
      option: {
        value: "a",
        [Marko._.contentFor(__marko_internal_tag_13)]: (v) => {
          [v];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  const __marko_internal_tag_14 = Pick;
  Marko._.attrTagNames(__marko_internal_tag_14, (input) => {
    input["@option"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_14)()()({
    bogus: 1,
    option: {
      value: "a",
      [Marko._.contentFor(__marko_internal_tag_14)]: (v) => {
        [v];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  const __marko_internal_tag_15 = Pick;
  Marko._.attrTagNames(__marko_internal_tag_15, (input) => {
    input["@option"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_15)()()({
    bogus: 1,
    option: {
      value: "a",
      [Marko._.contentFor(__marko_internal_tag_15)]: (v) => {
        [v];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  const __marko_internal_tag_16 = Marko._.resolveTemplate(
    import("./tags/pick-tag/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_16, (input) => {
    input["@option"];
    input["@option"];
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_16)(Marko._.withRestAttrTags)()(
    // A generic tag's repeated attribute tags, and ones in an if and a for
    {
      bogus: 1,
      option: {
        value: "a",
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          option: {
            value: "b",
            [Symbol.iterator]: Marko._.any,
          },
        },
        flag
          ? {
              option: {
                value: "c",
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
        Marko._.forOfAttrTag(
          {
            of: ["d"],
          },
          (x) =>
            Marko._.attrTags(__marko_internal_tag_16)([
              {
                option: {
                  value: x,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
    },
  );
  const __marko_internal_tag_17 = Pick;
  Marko._.attrTagNames(__marko_internal_tag_17, (input) => {
    input["@option"];
    input["@option"];
    input["@option"];
    input["@option"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_17)(Marko._.withRestAttrTags)()(
    {
      bogus: 1,
      option: {
        value: "a",
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          option: {
            value: "b",
            [Symbol.iterator]: Marko._.any,
          },
        },
        flag
          ? {
              option: {
                value: "c",
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
        Marko._.forOfAttrTag(
          {
            of: ["d"],
          },
          (x) =>
            Marko._.attrTags(__marko_internal_tag_17)([
              {
                option: {
                  value: x,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
    },
  );
  const __marko_internal_tag_18 = Pick;
  Marko._.attrTagNames(__marko_internal_tag_18, (input) => {
    input["@option"];
    input["@option"];
    input["@option"];
    input["@option"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_18)(Marko._.withRestAttrTags)()(
    {
      bogus: 1,
      option: {
        value: "a",
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          option: {
            value: "b",
            [Symbol.iterator]: Marko._.any,
          },
        },
        flag
          ? {
              option: {
                value: "c",
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
        Marko._.forOfAttrTag(
          {
            of: ["d"],
          },
          (x) =>
            Marko._.attrTags(__marko_internal_tag_18)([
              {
                option: {
                  value: x,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
    },
  );
  const __marko_internal_tag_19 = Marko._.resolveTemplate(
    import("./tags/pick-tag/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_19, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_19)(Marko._.withRestAttrTags)()({
    option: {
      value: "a",
      bogus: 1,
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      flag
        ? {
            option: {
              value: "b",
              bogus: 2,
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
  });
  const __marko_internal_tag_20 = Pick;
  Marko._.attrTagNames(__marko_internal_tag_20, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_20)(Marko._.withRestAttrTags)()(
    {
      option: {
        value: "a",
        bogus: 1,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              option: {
                value: "b",
                bogus: 2,
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
    },
  );
  const __marko_internal_tag_21 = Pick;
  Marko._.attrTagNames(__marko_internal_tag_21, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_21)(Marko._.withRestAttrTags)()(
    {
      option: {
        value: "a",
        bogus: 1,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              option: {
                value: "b",
                bogus: 2,
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
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
  ): () => A extends 2 | 3
    ? Marko._.RestAttrTagsRenderer<Input, void>
    : <I>(
        input: Marko.Directives &
          Input &
          Marko._.Relate<I, Marko.Directives & Input>,
      ) => Marko._.ReturnWithScope<I, void>;
}> {})();
