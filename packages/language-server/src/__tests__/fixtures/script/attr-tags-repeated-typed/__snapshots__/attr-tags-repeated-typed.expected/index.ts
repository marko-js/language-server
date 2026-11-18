export interface Input {
  user?: { name: string; email: string };
}
export type Component = Marko.Component<Input>;
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    item: {
      size: "small",
      [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          //                                ^?
          [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    item: {
      [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
              [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    item: {
      [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
                [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
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
                      [Marko._.contentFor(__marko_internal_module_1)]: ({
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
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
      [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    item: {
      size: "huge",
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    item: {
      bogus: 1,
      [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
        [foo];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    item: {
      [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
              [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    item: {
      [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
                [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
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
      [Marko._.contentFor(__marko_internal_module_1)]: ({ foo }) => {
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
    Marko._.renderTemplate(__marko_internal_module_2().default)(
      Marko._.withRestAttrTags,
    )()({
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
    const __marko_internal_rendered_1 = Marko._.renderTemplate(
      __marko_internal_module_3().default,
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
      __marko_internal_rendered_1.return,
    );
    Marko._.attrTagNames(__marko_internal_module_4, (input) => {
      input["@group"];
      input["@group"];
    });
    Marko._.renderTemplate(__marko_internal_module_4().default)(
      Marko._.withRestAttrTags,
    )()({
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
      const __marko_internal_rendered_2 = Marko._.renderTemplate(
        __marko_internal_module_3().default,
      )()()(
        // Else an error at the bind, as on one written once
        {
          value: "a",
        },
      );
      const __marko_internal_change__text = Marko._.change(
        "text",
        "value",
        __marko_internal_rendered_2.return,
      );
      Marko._.attrTagNames(__marko_internal_module_4, (input) => {
        input["@group"];
        input["@group"];
      });
      Marko._.renderTemplate(__marko_internal_module_4().default)(
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
declare function __marko_internal_module_1(): typeof import("./tags/menu/index.marko");
declare function __marko_internal_module_2(): typeof import("./tags/list/index.marko");
declare function __marko_internal_module_3(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_4(): typeof import("./tags/groups/index.marko");
