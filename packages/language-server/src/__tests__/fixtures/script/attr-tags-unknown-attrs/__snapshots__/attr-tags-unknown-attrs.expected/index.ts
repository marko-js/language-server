export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const fromItem = Marko._.hoist(() => __marko_internal_hoist__fromItem);
  const flag = Math.random() > 0.5;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  __marko_internal_module_1().default._({
    item: {
      size: "small",
      bogus: 1,
      ["content"]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a", "b"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              item: {
                size: "small",
                bogus: 1,
                ["content"]: ({ foo }) => {
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      Marko._.forInAttrTag(
        {
          in: { a: 1 },
        },
        (key) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              item: {
                bogus: 1,
                ["content"]: ({ foo }) => {
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      Marko._.forToAttrTag(
        {
          to: 2,
        },
        (i) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              item: {
                bogus: 1,
                ["content"]: ({ foo }) => {
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      Marko._.forUntilAttrTag(
        {
          until: 2,
        },
        (i) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              item: {
                bogus: 1,
                ["content"]: ({ foo }) => {
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_module_1)([
            flag
              ? {
                  item: {
                    bogus: 1,
                    ["content"]: ({ foo }) => {
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
    });
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              item: {
                row: {
                  label: name,
                  bogus: 1,
                  [Symbol.iterator]: Marko._.any,
                },
                ["content"]: ({ foo }) => {
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
    });
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a", "b"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              item: {
                size: "large",
                row: {
                  label: name,
                  [Symbol.iterator]: Marko._.any,
                },
                ["content"]: ({ foo }) => {
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    item: {
      bogus: 1,
      ["content"]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          bogus: 2,
          ["content"]: ({ foo }) => {
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
              ["content"]: ({ foo }) => {
                [foo];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
  });
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@a"];
    input["@a"];
  });
  __marko_internal_renderer_2(__marko_internal_module_2().default)({
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@a"];
  });
  __marko_internal_renderer_2(__marko_internal_module_2().default)({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1, 2],
        },
        (i) =>
          Marko._.attrTags(__marko_internal_module_2)([
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@nope"];
    Marko._.nestedAttrTagNames(input["@nope"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  __marko_internal_module_1().default._({
    nope: {
      ...Marko._.givenAttrTags("row"),
      ...Marko._.attrTags(
        __marko_internal_module_1,
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      flag
        ? (() => {
            const bar = 1;
            return Marko._.attrTags(__marko_internal_module_1)([
              {
                item: {
                  bogus: bar,
                  ["content"]: ({ foo }) => {
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  const __marko_internal_rendered_1 = __marko_internal_renderer_3(
    __marko_internal_module_1().default,
  )(
    // An error in an attribute tag and one in its repeated attribute tags: both
    // reported, and the variable it hoists still typed
    {
      item: {
        size: "huge",
        ...Marko._.givenAttrTags("row"),
        ...Marko._.attrTags(
          __marko_internal_module_1,
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
        ["content"]: (() => {
          {
            const fromItem = Marko._.returned(
              () => __marko_internal_rendered_2,
            );
            const __marko_internal_rendered_2 =
              __marko_internal_module_3().default._({
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
  __marko_internal_module_4().default._({
    async [Marko._.never]() {
      fromItem;
      //^?
    },
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@itme"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
    // An unknown attribute tag name only a <for> gives: reported once, at it
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: ["a", "b"],
          },
          (name) =>
            Marko._.attrTags(__marko_internal_module_1)([
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
    // Errors in two groups of an attribute tag's attribute tags, in a <for>: each
    // reported at it, and not its attributes ("specified more than once")
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: ["a", "b"],
          },
          (name) =>
            Marko._.attrTags(__marko_internal_module_1)([
              {
                item: {
                  size: "small",
                  ...Marko._.givenAttrTags("row"),
                  ...Marko._.attrTags(
                    __marko_internal_module_1,
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
                  ["content"]: (() => {
                    [name];
                    return Marko._.voidBody;
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
  Marko._.attrTagNames(__marko_internal_module_5, (input) => {
    input["@b"];
    input["@c"];
  });
  __marko_internal_renderer_4(__marko_internal_module_5().default)(
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
            Marko._.attrTags(__marko_internal_module_5)([
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
    Marko._.readScope(__marko_internal_rendered_1),
  );
  Marko._.noop({ fromItem, component, state, out, input, $global, $signal });
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("./tags/menu/index.marko");
declare function __marko_internal_module_2(): typeof import("./tags/empty/index.marko");
declare function __marko_internal_module_3(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_4(): typeof import("marko/src/core-tags/core/script.d.marko");
declare function __marko_internal_module_5(): typeof import("./tags/unk/index.marko");
function __marko_internal_renderer_3(
  template = __marko_internal_module_1().default,
) {
  return Marko._.renderer(template._, Marko._.actualInput);
}
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
function __marko_internal_renderer_4(
  template = __marko_internal_module_5().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
