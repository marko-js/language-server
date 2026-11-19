const ids = ["a", "b"];
export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
  });
  __marko_internal_module_1().default._(
    // Single
    {
      option: {
        value: "a",
        ["content"]: (v) => {
          [v];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
    input["@option"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
    // Repeated
    {
      option: {
        value: "a",
        ["content"]: (v) => {
          [v];
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
    // In a for: `any` (a loop's body is checked apart from the tag)
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: ["a", "b"] as const,
          },
          (x) =>
            Marko._.attrTags(__marko_internal_module_1)([
              {
                option: {
                  value: x,
                  ["content"]: (v) => {
                    [v];
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
    input["@option"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    option: {
      value: "a",
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      flag
        ? {
            option: {
              value: "b",
              ["content"]: (v) => {
                [v];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
  });
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@option"];
  });
  __marko_internal_module_2().default._({
    onPick(p) {
      p;
    },
    //                  ^?
    option: {
      value: "a",
      [Symbol.iterator]: Marko._.any,
    },
    // Tag params: first occurrence static
    ["content"]: (v) => {
      [v];
      return Marko._.voidReturn;
    },
  });
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@option"];
  });
  __marko_internal_renderer_2(__marko_internal_module_2().default)({
    onPick(p) {
      p;
    },
    // Tag params: only in a for
    ["content"]: (v) => {
      [v];
      return Marko._.voidReturn;
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ids,
        },
        //                  ^?
        (id) =>
          Marko._.attrTags(__marko_internal_module_2)([
            {
              option: {
                value: id,
                ["content"]: (o) => {
                  [o];
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@option"];
    input["@note"];
  });
  __marko_internal_renderer_2(__marko_internal_module_2().default)({
    onPick(p) {
      p;
    },
    // Tag params: only in a for with an error in another attribute tag (known: unknown)
    ["content"]: (v) => {
      [v];
      return Marko._.voidReturn;
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ids,
        },
        //                  ^?
        (id) =>
          Marko._.attrTags(__marko_internal_module_2)([
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@option"];
  });
  __marko_internal_renderer_2(__marko_internal_module_2().default)({
    onPick(p) {
      p;
    },
    // Tag params: only in an if
    ["content"]: (v) => {
      [v];
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@option"];
    input["@option"];
  });
  __marko_internal_renderer_2(__marko_internal_module_2().default)({
    onPick(p) {
      p;
    },
    //                  ^?
    option: {
      value: "a",
      [Symbol.iterator]: Marko._.any,
    },
    // Tag params: static first, another type in a for
    ["content"]: (v) => {
      [v];
      return Marko._.voidReturn;
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1, 2],
        },
        (n) =>
          Marko._.attrTags(__marko_internal_module_2)([
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@option"];
  });
  __marko_internal_renderer_2(__marko_internal_module_2().default)(
    // T only from a <for>, an annotated occurrence param: accepted
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: ids,
          },
          (id) =>
            Marko._.attrTags(__marko_internal_module_2)([
              {
                option: {
                  value: id,
                  ["content"]: (o: string) => {
                    [o];
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
  Marko._.attrTagNames(__marko_internal_module_3, (input) => {
    input["@option"];
  });
  __marko_internal_renderer_3(__marko_internal_module_3().default)({
    // Type parameter only from a loop, with keys an occurrence lacks
    ["content"]: (v) => {
      [v];
      return Marko._.voidReturn;
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a", "b"],
        },
        (x) =>
          Marko._.attrTags(__marko_internal_module_3)([
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
  Marko._.attrTagNames(__marko_internal_module_3, (input) => {
    input["@option"];
    input["@option"];
  });
  __marko_internal_renderer_3(__marko_internal_module_3().default)({
    option: {
      value: 3,
      [Symbol.iterator]: Marko._.any,
    },
    ["content"]: (v) => {
      [v];
      return Marko._.voidReturn;
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1, 2],
        },
        (x) =>
          Marko._.attrTags(__marko_internal_module_3)([
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@option"];
    input["@option"];
  });
  __marko_internal_renderer_2(__marko_internal_module_2().default)(
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
            Marko._.attrTags(__marko_internal_module_2)([
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@option"];
    input["@option"];
  });
  __marko_internal_renderer_2(__marko_internal_module_2().default)(
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
            Marko._.attrTags(__marko_internal_module_2)([
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
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("./tags/pick/index.marko");
declare function __marko_internal_module_2(): typeof import("./tags/sel/index.marko");
declare function __marko_internal_module_3(): typeof import("./tags/opt-pick/index.marko");
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
function __marko_internal_renderer_2(
  template = __marko_internal_module_2().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
function __marko_internal_renderer_3(
  template = __marko_internal_module_3().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
