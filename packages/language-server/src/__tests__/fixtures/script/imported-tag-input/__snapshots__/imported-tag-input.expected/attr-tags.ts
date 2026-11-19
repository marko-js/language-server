import Menu from "./tags/menu-tag/index.marko";
import Pick from "./tags/pick-tag/index.marko";
export interface Input {}
export type Component = Marko.Component<Input>;
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const flag = Math.random() > 0.5;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // Each tag is rendered by its discovered name, as an imported identifier and
    // as `<${X}>`: all report the same.
    // Repeated
    {
      bogus: 1,
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
            ["content"]: ({ foo }) => {
              [foo];
              return Marko._.voidReturn;
            },
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  const __marko_internal_tag_1 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_1)(Marko._.withRestAttrTags)()({
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
  });
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // In an if
    {
      bogus: 1,
      [Marko._.restAttrTags]: [
        flag
          ? {
              item: {
                size: "small",
                ["content"]: ({ foo }) => {
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
  const __marko_internal_tag_3 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_3)(Marko._.withRestAttrTags)()({
    bogus: 1,
    [Marko._.restAttrTags]: [
      flag
        ? {
            item: {
              size: "small",
              [Marko._.contentFor(__marko_internal_tag_3)]: ({ foo }) => {
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
  const __marko_internal_tag_4 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_4)(Marko._.withRestAttrTags)()({
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
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // In a for
    {
      bogus: 1,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: ["a", "b"],
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
      Marko._.forOfAttrTag(
        {
          of: ["a", "b"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_tag_5)([
            {
              item: {
                [Marko._.contentFor(__marko_internal_tag_5)]: ({ foo }) => {
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
  const __marko_internal_tag_6 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_6)(Marko._.withRestAttrTags)()({
    bogus: 1,
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a", "b"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_tag_6)([
            {
              item: {
                [Marko._.contentFor(__marko_internal_tag_6)]: ({ foo }) => {
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
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // An attribute the attribute tags do not have
    {
      item: {
        bogus: 1,
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
                bogus: 2,
                ["content"]: ({ foo }) => {
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
            Marko._.attrTags(__marko_internal_module_1)([
              {
                item: {
                  size: "tiny",
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
    },
  );
  const __marko_internal_tag_7 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@item"];
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_7)(Marko._.withRestAttrTags)()({
    item: {
      bogus: 1,
      [Marko._.contentFor(__marko_internal_tag_7)]: ({ foo }) => {
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
              [Marko._.contentFor(__marko_internal_tag_7)]: ({ foo }) => {
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
          Marko._.attrTags(__marko_internal_tag_7)([
            {
              item: {
                size: "tiny",
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
  });
  const __marko_internal_tag_8 = Menu;
  Marko._.attrTagNames(__marko_internal_tag_8, (input) => {
    input["@item"];
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_8)(Marko._.withRestAttrTags)()({
    item: {
      bogus: 1,
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
              bogus: 2,
              [Marko._.contentFor(__marko_internal_tag_8)]: ({ foo }) => {
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
          Marko._.attrTags(__marko_internal_tag_8)([
            {
              item: {
                size: "tiny",
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
  });
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)()()(
    // A generic tag's attribute tag
    {
      bogus: 1,
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
  const __marko_internal_tag_9 = Pick;
  Marko._.attrTagNames(__marko_internal_tag_9, (input) => {
    input["@option"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_9)()()({
    bogus: 1,
    option: {
      value: "a",
      [Marko._.contentFor(__marko_internal_tag_9)]: (v) => {
        [v];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  const __marko_internal_tag_10 = Pick;
  Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
    input["@option"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_10)()()({
    bogus: 1,
    option: {
      value: "a",
      [Marko._.contentFor(__marko_internal_tag_10)]: (v) => {
        [v];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@option"];
    input["@option"];
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()(
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
            Marko._.attrTags(__marko_internal_module_2)([
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
  const __marko_internal_tag_11 = Pick;
  Marko._.attrTagNames(__marko_internal_tag_11, (input) => {
    input["@option"];
    input["@option"];
    input["@option"];
    input["@option"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_11)(Marko._.withRestAttrTags)()(
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
    },
  );
  const __marko_internal_tag_12 = Pick;
  Marko._.attrTagNames(__marko_internal_tag_12, (input) => {
    input["@option"];
    input["@option"];
    input["@option"];
    input["@option"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_12)(Marko._.withRestAttrTags)()(
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
    },
  );
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()({
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
  const __marko_internal_tag_13 = Pick;
  Marko._.attrTagNames(__marko_internal_tag_13, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_13)(Marko._.withRestAttrTags)()(
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
  const __marko_internal_tag_14 = Pick;
  Marko._.attrTagNames(__marko_internal_tag_14, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_14)(Marko._.withRestAttrTags)()(
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
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./tags/menu-tag/index.marko");
declare function __marko_internal_module_2(): typeof import("./tags/pick-tag/index.marko");
