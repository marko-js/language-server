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
  const list = [1, 2];
  const extra = { v: 1, unknown: true };
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@a"];
    input["@a"];
    input["@b"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // Interleaved names: the second @a is its own repetition.
    {
      a: {
        v: 1,
        ["content"]: ({ n }) => {
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
            ["content"]: ({ n }) => {
              [n];
              return Marko._.voidReturn;
            },
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@a"];
    input["@a"];
    input["@b"];
    input["@b"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // Each branch with its own attribute tags, one repeated.
    {
      [Marko._.restAttrTags]: [
        flag
          ? {
              ...Marko._.attrTags(__marko_internal_module_1)([
                {
                  a: {
                    ["content"]: ({ n }) => {
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@a"];
    input["@a"];
    input["@b"];
    input["@b"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // Nested control flow: for in for, if in for, for in if.
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: list,
          },
          (i) =>
            Marko._.attrTags(__marko_internal_module_1)([
              Marko._.forOfAttrTag(
                {
                  of: list,
                },
                (j) =>
                  Marko._.attrTags(__marko_internal_module_1)([
                    {
                      a: {
                        v: i + j,
                        ["content"]: ({ n }) => {
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
                  Marko._.attrTags(__marko_internal_module_1)([
                    {
                      a: {
                        v: i,
                        ["content"]: ({ n }) => {
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
      input["@row"];
      input["@row"];
    });
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
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
              __marko_internal_module_1,
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
            Marko._.attrTags(__marko_internal_module_1)([
              {
                item: {
                  ...Marko._.givenAttrTags("row"),
                  ...Marko._.attrTags(
                    __marko_internal_module_1,
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@a"];
    input["@a"];
    input["@my-item"];
    input["@my-item"];
    input["@itme"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
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
              return Marko._.attrTags(__marko_internal_module_1)([
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
            Marko._.attrTags(__marko_internal_module_1)([
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@req"];
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()(
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()({
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: list,
        },
        (i) =>
          Marko._.attrTags(__marko_internal_module_2)([
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [1, 2] as const,
        },
        (i) =>
          Marko._.attrTags(__marko_internal_module_2)([
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
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()({
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
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./tags/edge-menu/index.marko");
declare function __marko_internal_module_2(): typeof import("./tags/req-menu/index.marko");
