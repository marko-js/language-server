const ids = ["a", "b"];
export interface Input {}
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)()()(
    // Single
    {
      option: {
        value: "a",
        [Marko._.contentFor(__marko_internal_module_1)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // Repeated
    {
      option: {
        value: "a",
        [Marko._.contentFor(__marko_internal_module_1)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
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
                  [Marko._.contentFor(__marko_internal_module_1)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    option: {
      value: "a",
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      flag
        ? {
            option: {
              value: "b",
              [Marko._.contentFor(__marko_internal_module_1)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_2().default)()()({
    onPick(p) {
      p;
    },
    //                  ^?
    option: {
      value: "a",
      [Symbol.iterator]: Marko._.any,
    },
    // Tag params: first occurrence static
    [Marko._.contentFor(__marko_internal_module_2)]: (v) => {
      [v];
      return Marko._.voidReturn;
    },
  });
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()({
    onPick(p) {
      p;
    },
    // Tag params: only in a for
    [Marko._.contentFor(__marko_internal_module_2)]: (v) => {
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
                [Marko._.contentFor(__marko_internal_module_2)]: (o) => {
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
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()({
    onPick(p) {
      p;
    },
    // Tag params: only in a for with an error in another attribute tag (known: unknown)
    [Marko._.contentFor(__marko_internal_module_2)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()({
    onPick(p) {
      p;
    },
    // Tag params: only in an if
    [Marko._.contentFor(__marko_internal_module_2)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()({
    onPick(p) {
      p;
    },
    //                  ^?
    option: {
      value: "a",
      [Symbol.iterator]: Marko._.any,
    },
    // Tag params: static first, another type in a for
    [Marko._.contentFor(__marko_internal_module_2)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()(
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
                  [Marko._.contentFor(__marko_internal_module_2)]: (
                    o: string,
                  ) => {
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
  Marko._.renderTemplate(__marko_internal_module_3().default)(
    Marko._.withRestAttrTags,
  )()({
    // Type parameter only from a loop, with keys an occurrence lacks
    [Marko._.contentFor(__marko_internal_module_3)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_3().default)(
    Marko._.withRestAttrTags,
  )()({
    option: {
      value: 3,
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.contentFor(__marko_internal_module_3)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()(
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
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()(
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
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./tags/pick/index.marko");
declare function __marko_internal_module_2(): typeof import("./tags/sel/index.marko");
declare function __marko_internal_module_3(): typeof import("./tags/opt-pick/index.marko");
