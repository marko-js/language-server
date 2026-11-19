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
export type Component = Marko.Component<Input>;
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // In two attribute tags
    {
      item: {
        size: "huge",
        ["content"]: ({ foo }) => {
          [foo];
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // In an attribute tag with params, beside an <if>
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
        //                          ^?
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
    },
  );
  Marko._.renderNativeTag("div")(
    // On a native tag, which has none to type: the compiler reports them
    {
      ...Marko._.attrTags(Marko._.any)([
        {
          item: {
            [Symbol.iterator]: Marko._.any,
          },
        },
        {
          item: {
            [Symbol.iterator]: Marko._.any,
          },
        },
      ]),
    },
  );
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@column"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()(
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
            Marko._.attrTags(__marko_internal_module_2)([
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@column"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()(
    // Unknown attribute in a <for> on a generic tag
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_module_2)([
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@column"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()(
    // Wrong value in a <for> on a generic tag
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_module_2)([
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@column"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()(
    // Missing attribute in a <for> on a generic tag
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_module_2)([
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@colum"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()(
    // Unknown attribute tag name in a <for> on a generic tag
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_module_2)([
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
  Marko._.attrTagNames(__marko_internal_module_3, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_module_3().default)(
    Marko._.withRestAttrTags,
  )()(
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
            Marko._.attrTags(__marko_internal_module_3)([
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
  Marko._.attrTagNames(__marko_internal_module_4, (input) => {
    input["@footer"];
  });
  Marko._.renderTemplate(__marko_internal_module_4().default)()()(
    // An attribute tag declared as a plain object (not `Marko.AttrTag`): reported
    // once and in an <if>, as main reports one written once
    {
      footer: {
        label: "a",
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  Marko._.attrTagNames(__marko_internal_module_4, (input) => {
    input["@footer"];
  });
  Marko._.renderTemplate(__marko_internal_module_4().default)(
    Marko._.withRestAttrTags,
  )()({
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)<2>()<string>()(
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
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
  const __marko_internal_tag_1 = body;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@x"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_1)(Marko._.withRestAttrTags)()(
    // A body that takes no input, given attribute tags in a <for>
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          () =>
            Marko._.attrTags(__marko_internal_tag_1)([
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
  const __marko_internal_tag_2 = render;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_2)()()(
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
  const __marko_internal_tag_3 = tpl;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@a"];
    input["@a"];
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_3)(Marko._.withRestAttrTags)()(
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
            Marko._.attrTags(__marko_internal_tag_3)([
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
  const __marko_internal_tag_4 = anyBody;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@a"];
    input["@a"];
    input["@a"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_4)(Marko._.withRestAttrTags)()({
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
          Marko._.attrTags(__marko_internal_tag_4)([
            {
              a: {
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./tags/menu/index.marko");
declare function __marko_internal_module_2(): typeof import("./tags/gtable/index.marko");
declare function __marko_internal_module_3(): typeof import("./tags/sel/index.marko");
declare function __marko_internal_module_4(): typeof import("./tags/plain/index.marko");
