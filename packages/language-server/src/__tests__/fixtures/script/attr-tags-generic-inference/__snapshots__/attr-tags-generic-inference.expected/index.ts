const ids = ["a", "b"];
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
    import("./tags/pick/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1)()()(
    // Single
    {
      option: {
        value: "a",
        [Marko._.contentFor(__marko_internal_tag_1)]: (v) => {
          v;
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("./tags/pick/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_2)(Marko._.withRestAttrTags)()(
    // Repeated
    {
      option: {
        value: "a",
        [Marko._.contentFor(__marko_internal_tag_2)]: (v) => {
          v;
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          //                        ^?
          option: {
            value: "b",
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  const __marko_internal_tag_3 = Marko._.resolveTemplate(
    import("./tags/pick/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_3)(Marko._.withRestAttrTags)()(
    // In a for: `any` (a loop's body is checked apart from the tag)
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: ["a", "b"] as const,
          },
          (x) =>
            Marko._.attrTags(__marko_internal_tag_3)([
              {
                option: {
                  value: x,
                  [Marko._.contentFor(__marko_internal_tag_3)]: (v) => {
                    v;
                    return Marko._.voidReturn;
                  },
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("option"),
    },
  );
  // In an if
  const flag = Math.random() > 0.5;
  const __marko_internal_tag_4 = Marko._.resolveTemplate(
    import("./tags/pick/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_4)(Marko._.withRestAttrTags)()({
    option: {
      value: "a",
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      flag
        ? {
            option: {
              value: "b",
              [Marko._.contentFor(__marko_internal_tag_4)]: (v) => {
                v;
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
  });
  const __marko_internal_tag_5 = Marko._.resolveTemplate(
    import("./tags/sel/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_5)()()({
    onPick(p) {
      p;
    },
    //                  ^?
    option: {
      value: "a",
      [Symbol.iterator]: Marko._.any,
    },
    // Tag params: first occurrence static
    [Marko._.contentFor(__marko_internal_tag_5)]: (v) => {
      v;
      return Marko._.voidReturn;
    },
  });
  const __marko_internal_tag_6 = Marko._.resolveTemplate(
    import("./tags/sel/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_6)(Marko._.withRestAttrTags)()({
    onPick(p) {
      p;
    },
    // Tag params: only in a for
    [Marko._.contentFor(__marko_internal_tag_6)]: (v) => {
      v;
      return Marko._.voidReturn;
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ids,
        },
        //                  ^?
        (id) =>
          Marko._.attrTags(__marko_internal_tag_6)([
            {
              option: {
                value: id,
                [Marko._.contentFor(__marko_internal_tag_6)]: (o) => {
                  o;
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("option"),
  });
  const __marko_internal_tag_7 = Marko._.resolveTemplate(
    import("./tags/sel/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@option"];
    input["@note"];
  });
  Marko._.renderTemplate(__marko_internal_tag_7)(Marko._.withRestAttrTags)()({
    onPick(p) {
      p;
    },
    // Tag params: only in a for with an error in another attribute tag (known: unknown)
    [Marko._.contentFor(__marko_internal_tag_7)]: (v) => {
      v;
      return Marko._.voidReturn;
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ids,
        },
        //                  ^?
        (id) =>
          Marko._.attrTags(__marko_internal_tag_7)([
            {
              option: {
                value: id,
                [Symbol.iterator]: Marko._.any,
              },
              note: {
                size: "tiny",
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("option", "note"),
  });
  const __marko_internal_tag_8 = Marko._.resolveTemplate(
    import("./tags/sel/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_8, (input) => {
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_8)(Marko._.withRestAttrTags)()({
    onPick(p) {
      p;
    },
    // Tag params: only in an if
    [Marko._.contentFor(__marko_internal_tag_8)]: (v) => {
      v;
      return Marko._.voidReturn;
    },
    [Marko._.restAttrTags]: [
      //                  ^?
      flag
        ? {
            option: {
              value: 1,
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
    ...Marko._.givenAttrTags("option"),
  });
  const __marko_internal_tag_9 = Marko._.resolveTemplate(
    import("./tags/sel/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_9, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_9)(Marko._.withRestAttrTags)()({
    onPick(p) {
      p;
    },
    //                  ^?
    option: {
      value: "a",
      [Symbol.iterator]: Marko._.any,
    },
    // Tag params: static first, another type in a for
    [Marko._.contentFor(__marko_internal_tag_9)]: (v) => {
      v;
      return Marko._.voidReturn;
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1, 2],
        },
        (n) =>
          Marko._.attrTags(__marko_internal_tag_9)([
            {
              option: {
                value: n,
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
  });
  const __marko_internal_tag_10 = Marko._.resolveTemplate(
    import("./tags/sel/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_10)(Marko._.withRestAttrTags)()(
    // T only from a <for>, an annotated occurrence param: accepted
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: ids,
          },
          (id) =>
            Marko._.attrTags(__marko_internal_tag_10)([
              {
                option: {
                  value: id,
                  [Marko._.contentFor(__marko_internal_tag_10)]: (
                    o: string,
                  ) => {
                    o;
                    return Marko._.voidReturn;
                  },
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("option"),
    },
  );
  const __marko_internal_tag_11 = Marko._.resolveTemplate(
    import("./tags/opt-pick/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_11, (input) => {
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_11)(Marko._.withRestAttrTags)()({
    // Type parameter only from a loop, with keys an occurrence lacks
    [Marko._.contentFor(__marko_internal_tag_11)]: (v) => {
      v;
      return Marko._.voidReturn;
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a", "b"],
        },
        (x) =>
          Marko._.attrTags(__marko_internal_tag_11)([
            {
              option: {
                value: x,
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("option"),
  });
  const __marko_internal_tag_12 = Marko._.resolveTemplate(
    import("./tags/opt-pick/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_12, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_12)(Marko._.withRestAttrTags)()({
    option: {
      value: 3,
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.contentFor(__marko_internal_tag_12)]: (v) => {
      v;
      return Marko._.voidReturn;
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1, 2],
        },
        (x) =>
          Marko._.attrTags(__marko_internal_tag_12)([
            {
              option: {
                value: x,
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
  });
  const __marko_internal_tag_13 = Marko._.resolveTemplate(
    import("./tags/sel/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_13, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_13)(Marko._.withRestAttrTags)()(
    // A static occurrence and a <for> whose values widen T together: no error
    {
      option: {
        value: null,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: ["a", "b"],
          },
          (s) =>
            Marko._.attrTags(__marko_internal_tag_13)([
              {
                option: {
                  value: s,
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
    },
  );
  const __marko_internal_tag_14 = Marko._.resolveTemplate(
    import("./tags/sel/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_14, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_tag_14)(Marko._.withRestAttrTags)()(
    // A conflict on T from an <if> in a <for>: reported from its attribute tag
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
            Marko._.attrTags(__marko_internal_tag_14)([
              n
                ? {
                    option: {
                      value: n,
                      [Symbol.iterator]: Marko._.any,
                    },
                  }
                : Marko._.never,
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
  ): Marko.MountedTemplate<typeof input>;

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
