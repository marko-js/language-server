export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@row"];
    Marko._.nestedAttrTagNames(input["@row"], (input) => {
      input["@cell"];
      input["@cell"];
    });
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [
            { foo: "a", bar: "b" },
            { foo: "c", bar: "d" },
          ],
        },
        (row) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              row: {
                ...Marko._.givenAttrTags("cell"),
                ...Marko._.attrTags(
                  __marko_internal_module_1,
                  "row",
                )([
                  {
                    // ^?
                    cell: {
                      [Marko._.contentFor(__marko_internal_module_1)]: (() => {
                        [row.foo];
                        return Marko._.voidBody;
                      })(),
                      [Symbol.iterator]: Marko._.any,
                    },
                  },
                  {
                    // ^?     ^?
                    cell: {
                      [Marko._.contentFor(__marko_internal_module_1)]: (() => {
                        [row.bar];
                        return Marko._.voidBody;
                      })(),
                      [Symbol.iterator]: Marko._.any,
                    },
                  },
                ]),
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("row"),
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@row"];
    Marko._.nestedAttrTagNames(input["@row"], (input) => {
      input["@cell"];
      input["@cell"];
    });
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: [
            { foo: "a", bar: "b" },
            { foo: "c", bar: "d" },
          ] as const,
        },
        (row) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              row: {
                ...Marko._.givenAttrTags("cell"),
                ...Marko._.attrTags(
                  __marko_internal_module_1,
                  "row",
                )([
                  {
                    // ^?
                    cell: {
                      [Marko._.contentFor(__marko_internal_module_1)]: (() => {
                        [row.foo];
                        return Marko._.voidBody;
                      })(),
                      [Symbol.iterator]: Marko._.any,
                    },
                  },
                  {
                    // ^?     ^?
                    cell: {
                      [Marko._.contentFor(__marko_internal_module_1)]: (() => {
                        [row.bar];
                        return Marko._.voidBody;
                      })(),
                      [Symbol.iterator]: Marko._.any,
                    },
                  },
                ]),
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("row"),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("./components/my-table.marko");
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
