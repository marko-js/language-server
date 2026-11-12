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
  const list = [1, 2];
  const extra = { v: 1, unknown: true };
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./tags/edge-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@a"];
    input["@a"];
    input["@b"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1)(Marko._.withRestAttrTags)()(
    // Interleaved names: the second @a is its own repetition.
    {
      a: {
        v: 1,
        [Marko._.contentFor(__marko_internal_tag_1)]: ({ n }) => {
          [n];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      //                 ^?
      b: {
        w: "x",
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          a: {
            [Marko._.contentFor(__marko_internal_tag_1)]: ({ n }) => {
              [n];
              return Marko._.voidReturn;
            },
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("./tags/edge-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@a"];
    input["@a"];
    input["@b"];
    input["@b"];
  });
  Marko._.renderTemplate(__marko_internal_tag_2)(Marko._.withRestAttrTags)()(
    // Each branch with its own attribute tags, one repeated.
    {
      [Marko._.restAttrTags]: [
        flag
          ? {
              ...Marko._.attrTags(__marko_internal_tag_2)([
                {
                  a: {
                    [Marko._.contentFor(__marko_internal_tag_2)]: ({ n }) => {
                      [n];
                      return Marko._.voidReturn;
                    },
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  a: {
                    v: 2,
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
            }
          : !flag
            ? {
                b: {
                  w: "y",
                  [Symbol.iterator]: Marko._.any,
                },
              }
            : {
                b: {
                  w: 1,
                  [Symbol.iterator]: Marko._.any,
                },
              },
      ],
      ...Marko._.givenAttrTags("a", "b"),
    },
  );
  const __marko_internal_tag_3 = Marko._.resolveTemplate(
    import("./tags/edge-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@a"];
    input["@a"];
    input["@b"];
    input["@b"];
  });
  Marko._.renderTemplate(__marko_internal_tag_3)(Marko._.withRestAttrTags)()(
    // Nested control flow: for in for, if in for, for in if.
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: list,
          },
          (i) =>
            Marko._.attrTags(__marko_internal_tag_3)([
              Marko._.forOfAttrTag(
                {
                  of: list,
                },
                (j) =>
                  Marko._.attrTags(__marko_internal_tag_3)([
                    {
                      a: {
                        v: i + j,
                        [Marko._.contentFor(__marko_internal_tag_3)]: ({
                          n,
                        }) => {
                          [n];
                          return Marko._.voidReturn;
                        },
                        [Symbol.iterator]: Marko._.any,
                      },
                    },
                  ]),
              ),
              i > 1
                ? {
                    b: {
                      w: String(i),
                      bogus: 1,
                      [Symbol.iterator]: Marko._.any,
                    },
                  }
                : Marko._.never,
            ]),
        ),
        flag
          ? {
              ...Marko._.forOfAttrTag(
                {
                  of: list,
                },
                (i) =>
                  Marko._.attrTags(__marko_internal_tag_3)([
                    {
                      a: {
                        v: i,
                        [Marko._.contentFor(__marko_internal_tag_3)]: ({
                          n,
                        }) => {
                          [n];
                          return Marko._.voidReturn;
                        },
                        [Symbol.iterator]: Marko._.any,
                      },
                      //                     ^?
                      b: {
                        nope: i,
                        [Symbol.iterator]: Marko._.any,
                      },
                    },
                  ]),
              ),
            }
          : Marko._.never,
      ],
      ...Marko._.givenAttrTags("a", "b"),
    },
  );
  const __marko_internal_tag_4 = Marko._.resolveTemplate(
    import("./tags/edge-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@item"];
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
      input["@row"];
      input["@row"];
    });
  });
  Marko._.renderTemplate(__marko_internal_tag_4)(Marko._.withRestAttrTags)()(
    // Nested attribute tags, dynamic inside static and inside dynamic.
    {
      item: {
        ...Marko._.givenAttrTags("row"),
        ...Marko._.forOfAttrTag(
          {
            of: list,
          },
          (i) =>
            Marko._.attrTags(
              __marko_internal_tag_4,
              "item",
            )([
              {
                row: {
                  label: String(i),
                  [Symbol.iterator]: Marko._.any,
                },
              },
              {
                row: {
                  label: i,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: list,
          },
          (i) =>
            Marko._.attrTags(__marko_internal_tag_4)([
              {
                item: {
                  ...Marko._.givenAttrTags("row"),
                  ...Marko._.attrTags(
                    __marko_internal_tag_4,
                    "item",
                  )([
                    flag
                      ? {
                          row: {
                            label: String(i),
                            bogus: 1,
                            [Symbol.iterator]: Marko._.any,
                          },
                        }
                      : Marko._.never,
                  ]),
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
    },
  );
  const __marko_internal_tag_5 = Marko._.resolveTemplate(
    import("./tags/edge-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@a"];
    input["@a"];
    input["@my-item"];
    input["@my-item"];
    input["@itme"];
  });
  Marko._.renderTemplate(__marko_internal_tag_5)(Marko._.withRestAttrTags)()(
    // A scriptlet in a dynamic body, a quoted name, a spread, an unknown name.
    {
      "my-item": {
        x: 1,
        [Symbol.iterator]: Marko._.any,
      },
      a: {
        ...extra,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          "my-item": {
            x: "2",
            [Symbol.iterator]: Marko._.any,
          },
        },
        flag
          ? (() => {
              const v = 3;
              return Marko._.attrTags(__marko_internal_tag_5)([
                {
                  a: {
                    v: v,
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]);
            })()
          : Marko._.never,
        Marko._.forOfAttrTag(
          {
            of: list,
          },
          (i) =>
            Marko._.attrTags(__marko_internal_tag_5)([
              {
                itme: {
                  v: i,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("itme"),
    },
  );
  const __marko_internal_tag_6 = Marko._.resolveTemplate(
    import("./tags/req-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@req"];
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_tag_6)(Marko._.withRestAttrTags)()(
    // A required attribute tag: present, and only in an <if> or a loop (given).
    {
      req: {
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              req: {
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
    },
  );
  const __marko_internal_tag_7 = Marko._.resolveTemplate(
    import("./tags/req-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_tag_7)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      flag
        ? {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("req"),
  });
  const __marko_internal_tag_8 = Marko._.resolveTemplate(
    import("./tags/req-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_8, (input) => {
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_tag_8)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: list,
        },
        (i) =>
          Marko._.attrTags(__marko_internal_tag_8)([
            {
              req: {
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("req"),
  });
  const __marko_internal_tag_9 = Marko._.resolveTemplate(
    import("./tags/req-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_9, (input) => {
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_tag_9)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1, 2] as const,
        },
        (i) =>
          Marko._.attrTags(__marko_internal_tag_9)([
            {
              req: {
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("req"),
  });
  const __marko_internal_tag_10 = Marko._.resolveTemplate(
    import("./tags/req-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_tag_10)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      flag
        ? {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          }
        : (() => {
            console.log("none");
            return Marko._.never;
          })(),
    ],
    ...Marko._.givenAttrTags("req"),
  });
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
