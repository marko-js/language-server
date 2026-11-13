export interface Input {
  user?: { name: string; email: string };
}
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
  const both = Marko._.hoist(() => __marko_internal_hoist__both);
  const text = Marko._.hoist(() => __marko_internal_hoist__text);
  const flag = Math.random() > 0.5;
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1)(Marko._.withRestAttrTags)()({
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
          //                                ^?
          [Marko._.contentFor(__marko_internal_tag_1)]: ({ foo }) => {
            [foo];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_2)(Marko._.withRestAttrTags)()({
    item: {
      [Marko._.contentFor(__marko_internal_tag_2)]: ({ foo }) => {
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
              [Marko._.contentFor(__marko_internal_tag_2)]: ({ foo }) => {
                [foo];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
  });
  const __marko_internal_tag_3 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_3)(Marko._.withRestAttrTags)()({
    item: {
      [Marko._.contentFor(__marko_internal_tag_3)]: ({ foo }) => {
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
          Marko._.attrTags(__marko_internal_tag_3)([
            {
              item: {
                [Marko._.contentFor(__marko_internal_tag_3)]: ({ foo }) => {
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
  const __marko_internal_tag_4 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_4)(Marko._.withRestAttrTags)()({
    [Marko._.restAttrTags]: [
      flag
        ? {
            ...Marko._.forOfAttrTag(
              {
                of: ["a"],
              },
              (name) =>
                Marko._.attrTags(__marko_internal_tag_4)([
                  {
                    item: {
                      [Marko._.contentFor(__marko_internal_tag_4)]: ({
                        foo,
                      }) => {
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
  const __marko_internal_tag_5 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  Marko._.renderTemplate(__marko_internal_tag_5)()()({
    item: {
      ...Marko._.givenAttrTags("row"),
      ...Marko._.attrTags(
        __marko_internal_tag_5,
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
      [Marko._.contentFor(__marko_internal_tag_5)]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  const __marko_internal_tag_6 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_6)(Marko._.withRestAttrTags)()({
    item: {
      size: "huge",
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          [Marko._.contentFor(__marko_internal_tag_6)]: ({ foo }) => {
            [foo];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_7 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_7)(Marko._.withRestAttrTags)()({
    item: {
      bogus: 1,
      [Marko._.contentFor(__marko_internal_tag_7)]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          [Marko._.contentFor(__marko_internal_tag_7)]: ({ foo }) => {
            [foo];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_8 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_8, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_8)(Marko._.withRestAttrTags)()({
    item: {
      [Marko._.contentFor(__marko_internal_tag_8)]: ({ foo }) => {
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
              [Marko._.contentFor(__marko_internal_tag_8)]: ({ foo }) => {
                [foo];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          }
        : Marko._.never,
    ],
  });
  const __marko_internal_tag_9 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_9, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_9)(Marko._.withRestAttrTags)()({
    item: {
      [Marko._.contentFor(__marko_internal_tag_9)]: ({ foo }) => {
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
          Marko._.attrTags(__marko_internal_tag_9)([
            {
              item: {
                bogus: name,
                [Marko._.contentFor(__marko_internal_tag_9)]: ({ foo }) => {
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
  const __marko_internal_tag_10 = Marko._.resolveTemplate(
    import("./tags/menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  Marko._.renderTemplate(__marko_internal_tag_10)()()({
    item: {
      ...Marko._.givenAttrTags("row"),
      ...Marko._.attrTags(
        __marko_internal_tag_10,
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
      [Marko._.contentFor(__marko_internal_tag_10)]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  // Repeated and <if> occurrences reading a narrowed property
  if (input.user) {
    const __marko_internal_tag_11 = Marko._.resolveTemplate(
      import("./tags/list/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_11, (input) => {
      input["@item"];
      input["@item"];
      input["@item"];
    });
    Marko._.renderTemplate(__marko_internal_tag_11)(Marko._.withRestAttrTags)()(
      {
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
      },
    );
  }
  const __marko_internal_tag_12 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/let.d.marko"),
  ).default;
  {
    const both = Marko._.returned(() => __marko_internal_rendered_12);
    const __marko_internal_rendered_12 = Marko._.renderTemplate(
      __marko_internal_tag_12,
    )()()(
      // A bind on a repeated attribute tag: clean when the variable takes what its
      // change handler gives
      {
        value: "a" as string | number,
      },
    );
    const __marko_internal_change__both = Marko._.change(
      "both",
      "value",
      __marko_internal_rendered_12.return,
    );
    const __marko_internal_tag_13 = Marko._.resolveTemplate(
      import("./tags/groups/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_13, (input) => {
      input["@group"];
      input["@group"];
    });
    Marko._.renderTemplate(__marko_internal_tag_13)(Marko._.withRestAttrTags)()(
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
      },
    );
    const __marko_internal_tag_14 = Marko._.resolveTemplate(
      import("@marko/runtime-tags/tags/let.d.marko"),
    ).default;
    {
      const text = Marko._.returned(() => __marko_internal_rendered_14);
      const __marko_internal_rendered_14 = Marko._.renderTemplate(
        __marko_internal_tag_14,
      )()()(
        // Else an error at the bind, as on one written once
        {
          value: "a",
        },
      );
      const __marko_internal_change__text = Marko._.change(
        "text",
        "value",
        __marko_internal_rendered_14.return,
      );
      const __marko_internal_tag_15 = Marko._.resolveTemplate(
        import("./tags/groups/index.marko"),
      ).default;
      Marko._.attrTagNames(__marko_internal_tag_15, (input) => {
        input["@group"];
        input["@group"];
      });
      Marko._.renderTemplate(__marko_internal_tag_15)(
        Marko._.withRestAttrTags,
      )()({
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
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
const Input = new Template();
export default Input;
