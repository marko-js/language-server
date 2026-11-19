export interface Input {
  user?: { name: string; email: string };
}
export type Component = Marko.Component<Input>;
const Input: Marko.Template<Input, void> & {
  Component: typeof Marko.Component;
} = Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const both = Marko._.hoist(() => __marko_internal_hoist__both);
  const text = Marko._.hoist(() => __marko_internal_hoist__text);
  const flag = Math.random() > 0.5;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    item: {
      size: "small",
      ["content"]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          //                                ^?
          ["content"]: ({ foo }) => {
            [foo];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    item: {
      ["content"]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      flag
        ? {
            item: {
              size: "large",
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    item: {
      ["content"]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              item: {
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
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      flag
        ? {
            ...Marko._.forOfAttrTag(
              {
                of: ["a"],
              },
              (name) =>
                Marko._.attrTags(__marko_internal_module_1)([
                  {
                    item: {
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
          }
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
  __marko_internal_module_1().default._({
    item: {
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
            label: "b",
            [Symbol.iterator]: Marko._.any,
          },
        },
      ]),
      ["content"]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    item: {
      size: "huge",
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          ["content"]: ({ foo }) => {
            [foo];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
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
          ["content"]: ({ foo }) => {
            [foo];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    item: {
      ["content"]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      flag
        ? {
            item: {
              bogus: 1,
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    item: {
      ["content"]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              item: {
                bogus: name,
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
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  __marko_internal_module_1().default._({
    item: {
      ...Marko._.givenAttrTags("row"),
      ...Marko._.attrTags(
        __marko_internal_module_1,
        "item",
      )([
        {
          row: {
            label: "a",
            bogus: 1,
            [Symbol.iterator]: Marko._.any,
          },
        },
        {
          row: {
            label: "b",
            [Symbol.iterator]: Marko._.any,
          },
        },
      ]),
      ["content"]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  // Repeated and <if> occurrences reading a narrowed property
  if (input.user) {
    Marko._.attrTagNames(__marko_internal_module_2, (input) => {
      input["@item"];
      input["@item"];
      input["@item"];
    });
    __marko_internal_renderer_2(__marko_internal_module_2().default)({
      item: {
        label: input.user.name,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          item: {
            label: input.user.email,
            [Symbol.iterator]: Marko._.any,
          },
        },
        flag
          ? {
              item: {
                label: input.user.name,
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
    });
  }
  {
    const both = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_3().default._(
      // A bind on a repeated attribute tag: clean when the variable takes what its
      // change handler gives
      {
        value: "a" as string | number,
      },
    );
    const __marko_internal_change__both = Marko._.change(
      "both",
      "value",
      __marko_internal_rendered_1,
    );
    Marko._.attrTagNames(__marko_internal_module_4, (input) => {
      input["@group"];
      input["@group"];
    });
    __marko_internal_renderer_3(__marko_internal_module_4().default)({
      group: {
        selected: both,
        selectedChange(
          // @ts-ignore
          _both,
        ) {
          __marko_internal_change__both.both = _both;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          group: {
            selected: both,
            selectedChange(
              // @ts-ignore
              _both,
            ) {
              __marko_internal_change__both.both = _both;
            },
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    });
    {
      const text = Marko._.returned(() => __marko_internal_rendered_2);
      const __marko_internal_rendered_2 = __marko_internal_module_3().default._(
        // Else an error at the bind, as on one written once
        {
          value: "a",
        },
      );
      const __marko_internal_change__text = Marko._.change(
        "text",
        "value",
        __marko_internal_rendered_2,
      );
      Marko._.attrTagNames(__marko_internal_module_4, (input) => {
        input["@group"];
        input["@group"];
      });
      __marko_internal_renderer_3(__marko_internal_module_4().default)({
        group: {
          selected: text,
          selectedChange(
            // @ts-ignore
            _text,
          ) {
            __marko_internal_change__text.text = _text;
          },
          [Symbol.iterator]: Marko._.any,
        },
        [Marko._.restAttrTags]: [
          {
            group: {
              selected: text,
              selectedChange(
                // @ts-ignore
                _text,
              ) {
                __marko_internal_change__text.text = _text;
              },
              [Symbol.iterator]: Marko._.any,
            },
          },
        ],
      });
      var __marko_internal_hoist__both = both;
      var __marko_internal_hoist__text = text;
    }
  }
  Marko._.noop({ both, text, component, state, out, input, $global, $signal });
}, Marko.Component);
export default Input;
declare function __marko_internal_module_1(): typeof import("./tags/menu/index.marko");
declare function __marko_internal_module_2(): typeof import("./tags/list/index.marko");
declare function __marko_internal_module_3(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_4(): typeof import("./tags/groups/index.marko");
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
  template = __marko_internal_module_4().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
