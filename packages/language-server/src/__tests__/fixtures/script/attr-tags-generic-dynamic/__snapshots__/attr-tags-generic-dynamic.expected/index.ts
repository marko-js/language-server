const users = [{ name: "a" }, { name: "b" }];
const cols = ["x", "y"];
const groups = [{ items: ["p", "q"] }];
const record = { a: 1, b: 2 } as const;
export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const flag = Math.random() > 0.5;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
    input["@option"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
    // From an attribute, repeated
    {
      value: "a",
      option: {
        value: "b",
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
            value: "c",
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
    // From an attribute, in an if
    {
      value: 1,
      [Marko._.restAttrTags]: [
        flag
          ? {
              option: {
                value: 2,
                ["content"]: (v) => {
                  [v];
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
      ...Marko._.givenAttrTags("option"),
    },
  );
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
    input["@option"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
    // From an attribute and the attribute tags, as const
    {
      value: "a" as const,
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
            value: "a",
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
  });
  __marko_internal_module_1().default._({
    value: "a" as const,
    option: {
      value: "a",
      ["content"]: (v) => {
        [v];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
    input["@option"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    value: "a" as const,
    option: {
      value: "a" as const,
      ["content"]: (v) => {
        [v];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        //                                 ^?
        option: {
          value: "a" as const,
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
    input["@option"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
    option: {
      value: 1,
      [Symbol.iterator]: Marko._.any,
    },
    // From the attribute tags, into the tag's own content
    ["content"]: (v) => {
      [v];
      return Marko._.voidReturn;
    },
    [Marko._.restAttrTags]: [
      {
        option: {
          value: 2,
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
    input["@option"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
    // An attribute tag that disagrees with the attribute
    {
      value: "a",
      option: {
        value: "b",
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          option: {
            value: 1,
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
    // From an attribute, in a for (its body is typed apart from the tag)
    {
      value: "a",
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: ["b", "c"],
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.restAttrTagsRenderer(
    __marko_internal_module_1().default._<number>,
    Marko._.actualInput,
  )(
    // Given type arguments
    {
      option: {
        value: 1,
        ["content"]: (v) => {
          [v];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          //                      ^?
          option: {
            value: "a",
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@column"];
    input["@column"];
  });
  __marko_internal_renderer_2(__marko_internal_module_2().default)(
    // From an attribute, into repeated attribute tags' params
    {
      rows: [{ id: "a" }],
      column: {
        header: "Id",
        ["content"]: ({ row }) => {
          [row.id];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          column: {
            header: "Id again",
            //                                ^?
            ["content"]: ({ row }) => {
              [row.id];
              return Marko._.voidReturn;
            },
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  Marko._.attrTagNames(__marko_internal_module_2, (input) => {
    input["@column"];
    input["@column"];
  });
  Marko._.restAttrTagsRenderer(
    __marko_internal_module_2().default._<{ id: string }>,
    Marko._.actualInput,
  )({
    rows: [],
    column: {
      header: "Id",
      ["content"]: ({ row }) => {
        [row.id];
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        column: {
          header: "Id again",
          //                                ^?
          ["content"]: ({ row }) => {
            [row.id];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  Marko._.attrTagNames(__marko_internal_module_3, (input) => {
    input["@column"];
    input["@column"];
  });
  __marko_internal_renderer_3(__marko_internal_module_3().default)(
    // A required attribute tag, from an attribute: repeated, in an if, in a for
    {
      rows: [{ id: "a" }],
      sort(a, b) {
        return a.id.localeCompare(b.id);
      },
      column: {
        header: "Id",
        ["content"]: (row) => {
          [row.id];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          column: {
            header: "Id again",
            //                            ^?
            ["content"]: (row) => {
              [row.id];
              return Marko._.voidReturn;
            },
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  Marko._.attrTagNames(__marko_internal_module_3, (input) => {
    input["@column"];
    input["@column"];
  });
  __marko_internal_renderer_3(__marko_internal_module_3().default)({
    rows: [{ id: "a" }],
    sort(a, b) {
      return a.id.localeCompare(b.id);
    },
    [Marko._.restAttrTags]: [
      flag
        ? {
            column: {
              header: "Id",
              ["content"]: (row) => {
                [row.id];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          }
        : {
            column: {
              header: "Id again",
              ["content"]: (row) => {
                [row.id];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          },
    ],
    ...Marko._.givenAttrTags("column"),
  });
  Marko._.attrTagNames(__marko_internal_module_3, (input) => {
    input["@column"];
  });
  __marko_internal_renderer_3(__marko_internal_module_3().default)({
    rows: [{ id: "a" }],
    sort(a, b) {
      return a.id.localeCompare(b.id);
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["Id", "Id again"] as const,
        },
        //                                                ^?
        (header) =>
          Marko._.attrTags(__marko_internal_module_3)([
            {
              column: {
                header: header,
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("column"),
  });
  Marko._.attrTagNames(__marko_internal_module_4, (input) => {
    input["@column"];
    input["@column"];
  });
  __marko_internal_renderer_4(__marko_internal_module_4().default)(
    // The same, with a constrained type parameter
    {
      rows: [{ id: "a", name: "A" }],
      sort(a, b) {
        return a.name.localeCompare(b.name);
      },
      column: {
        header: "Name",
        ["content"]: (row) => {
          [row.name];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          column: {
            header: "Id",
            ["content"]: (row) => {
              [row.id];
              return Marko._.voidReturn;
            },
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  Marko._.attrTagNames(__marko_internal_module_4, (input) => {
    input["@column"];
    input["@column"];
  });
  __marko_internal_renderer_4(__marko_internal_module_4().default)({
    rows: [{ id: "a", name: "A" }],
    sort(a, b) {
      return a.name.localeCompare(b.name);
    },
    [Marko._.restAttrTags]: [
      flag
        ? {
            column: {
              header: "Name",
              ["content"]: (row) => {
                [row.name];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          }
        : {
            column: {
              header: "Id",
              ["content"]: (row) => {
                [row.id];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          },
    ],
    ...Marko._.givenAttrTags("column"),
  });
  Marko._.attrTagNames(__marko_internal_module_4, (input) => {
    input["@column"];
  });
  __marko_internal_renderer_4(__marko_internal_module_4().default)({
    rows: [{ id: "a", name: "A" }],
    sort(a, b) {
      return a.name.localeCompare(b.name);
    },
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["Name", "Id"] as const,
        },
        (header) =>
          Marko._.attrTags(__marko_internal_module_4)([
            {
              column: {
                header: header,
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("column"),
  });
  Marko._.attrTagNames(__marko_internal_module_5, (input) => {
    input["@column"];
  });
  __marko_internal_renderer_5(__marko_internal_module_5().default)(
    // T from an attribute, body param in a <for>: `any`, as in every loop's body
    // (checked apart from the tag, so without its type arguments)
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_module_5)([
              {
                column: {
                  title: c,
                  ["content"]: (row) => {
                    [row.name];
                    return Marko._.voidReturn;
                  },
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("column"),
    },
  );
  Marko._.attrTagNames(__marko_internal_module_5, (input) => {
    input["@column"];
  });
  __marko_internal_renderer_5(__marko_internal_module_5().default)(
    // T from an attribute, a <for> in an <if>
    {
      rows: users,
      [Marko._.restAttrTags]: [
        flag
          ? {
              ...Marko._.forOfAttrTag(
                {
                  of: cols,
                },
                (c) =>
                  Marko._.attrTags(__marko_internal_module_5)([
                    {
                      column: {
                        title: c,
                        ["content"]: (row) => {
                          [row.name];
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
      ...Marko._.givenAttrTags("column"),
    },
  );
  Marko._.attrTagNames(__marko_internal_module_5, (input) => {
    input["@column"];
  });
  __marko_internal_renderer_5(__marko_internal_module_5().default)(
    // T from an attribute, an <if> in a <for>
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_module_5)([
              flag
                ? {
                    column: {
                      title: c,
                      ["content"]: (row) => {
                        [row.name];
                        return Marko._.voidReturn;
                      },
                      [Symbol.iterator]: Marko._.any,
                    },
                  }
                : Marko._.never,
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("column"),
    },
  );
  Marko._.attrTagNames(__marko_internal_module_5, (input) => {
    input["@column"];
  });
  __marko_internal_renderer_5(__marko_internal_module_5().default)(
    // T from an attribute, nested <for>s
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: groups,
          },
          (g) =>
            Marko._.forOfAttrTag(
              {
                of: g.items,
              },
              (c) =>
                Marko._.attrTags(__marko_internal_module_5)([
                  {
                    column: {
                      title: c,
                      ["content"]: (row) => {
                        [row.name];
                        return Marko._.voidReturn;
                      },
                      [Symbol.iterator]: Marko._.any,
                    },
                  },
                ]),
            ),
        ),
      ],
      ...Marko._.givenAttrTags("column"),
    },
  );
  Marko._.attrTagNames(__marko_internal_module_5, (input) => {
    input["@column"];
  });
  __marko_internal_renderer_5(__marko_internal_module_5().default)(
    // T from an attribute, <for to>
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forToAttrTag(
          {
            to: 2,
          },
          (i) =>
            Marko._.attrTags(__marko_internal_module_5)([
              {
                column: {
                  title: String(i),
                  ["content"]: (row) => {
                    [row.name];
                    return Marko._.voidReturn;
                  },
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("column"),
    },
  );
  Marko._.attrTagNames(__marko_internal_module_5, (input) => {
    input["@column"];
  });
  __marko_internal_renderer_5(__marko_internal_module_5().default)(
    // T from an attribute, <for in>
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forInAttrTag(
          {
            in: record,
          },
          (key) =>
            Marko._.attrTags(__marko_internal_module_5)([
              {
                column: {
                  title: key,
                  ["content"]: (row) => {
                    [row.name];
                    return Marko._.voidReturn;
                  },
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("column"),
    },
  );
  Marko._.attrTagNames(__marko_internal_module_5, (input) => {
    input["@column"];
  });
  __marko_internal_renderer_5(__marko_internal_module_5().default)(
    // T from an attribute, an <if> body with a scriptlet: `any`, as in a loop's body
    {
      rows: users,
      [Marko._.restAttrTags]: [
        flag
          ? (() => {
              const label = "x";
              return Marko._.attrTags(__marko_internal_module_5)([
                {
                  column: {
                    title: label,
                    ["content"]: (row) => {
                      [row.name];
                      return Marko._.voidReturn;
                    },
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]);
            })()
          : Marko._.never,
      ],
      ...Marko._.givenAttrTags("column"),
    },
  );
  Marko._.attrTagNames(__marko_internal_module_6, (input) => {
    input["@section"];
    Marko._.nestedAttrTagNames(input["@section"], (input) => {
      input["@row"];
    });
  });
  __marko_internal_module_6().default._(
    // T from an attribute, a nested attribute tag's <for>: its body params are
    // `any` (known: a nested attribute tag's rest attribute tags are checked apart
    // from the tag, so without its type arguments)
    {
      rows: users,
      section: {
        title: "s",
        ...Marko._.givenAttrTags("row"),
        ...Marko._.forOfAttrTag(
          {
            of: [1, 2],
          },
          (i) =>
            Marko._.attrTags(
              __marko_internal_module_6,
              "section",
            )([
              {
                row: {
                  id: i,
                  ["content"]: (r) => {
                    [r.name];
                    return Marko._.voidReturn;
                  },
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  Marko._.attrTagNames(__marko_internal_module_5, (input) => {
    input["@column"];
  });
  __marko_internal_renderer_5(__marko_internal_module_5().default)(
    // The same in a tag in the body of another tag's <for>: written as a tag of
    // its own, not as one of that tag's attribute tags
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_module_5)([
              {
                column: {
                  title: c,
                  ["content"]: (row) => {
                    Marko._.attrTagNames(__marko_internal_module_6, (input) => {
                      input["@section"];
                      Marko._.nestedAttrTagNames(input["@section"], (input) => {
                        input["@row"];
                      });
                    });
                    __marko_internal_module_6().default._({
                      rows: [row],
                      section: {
                        title: c,
                        ...Marko._.givenAttrTags("row"),
                        ...Marko._.forOfAttrTag(
                          {
                            of: [1, 2],
                          },
                          (i) =>
                            Marko._.attrTags(
                              __marko_internal_module_6,
                              "section",
                            )([
                              {
                                row: {
                                  id: i,
                                  ["content"]: (r) => {
                                    [r.name];
                                    return Marko._.voidReturn;
                                  },
                                  [Symbol.iterator]: Marko._.any,
                                },
                              },
                            ]),
                        ),
                        [Symbol.iterator]: Marko._.any,
                      },
                    });
                    return Marko._.voidReturn;
                  },
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("column"),
    },
  );
  Marko._.attrTagNames(__marko_internal_module_5, (input) => {
    input["@column"];
  });
  __marko_internal_renderer_5(__marko_internal_module_5().default)(
    // Annotated body params in a <for> on a generic tag
    {
      rows: users,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (c) =>
            Marko._.attrTags(__marko_internal_module_5)([
              {
                column: {
                  title: c,
                  ["content"]: (row: { name: string }) => {
                    [row.name];
                    return Marko._.voidReturn;
                  },
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("column"),
    },
  );
  Marko._.attrTagNames(__marko_internal_module_6, (input) => {
    input["@section"];
    Marko._.nestedAttrTagNames(input["@section"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  __marko_internal_module_6().default._(
    // The same repeated: annotated body params are accepted, others are `any`,
    // also with its attribute tag in a <for>
    {
      rows: users,
      section: {
        title: "s",
        ...Marko._.givenAttrTags("row"),
        ...Marko._.attrTags(
          __marko_internal_module_6,
          "section",
        )([
          {
            row: {
              id: 1,
              ["content"]: (r: { name: string }) => {
                [r.name];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            row: {
              id: 2,
              ["content"]: (r) => {
                [r.name];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          },
        ]),
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  Marko._.attrTagNames(__marko_internal_module_6, (input) => {
    input["@section"];
    Marko._.nestedAttrTagNames(input["@section"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  __marko_internal_renderer_6(__marko_internal_module_6().default)({
    rows: users,
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: cols,
        },
        (c) =>
          Marko._.attrTags(__marko_internal_module_6)([
            {
              section: {
                title: c,
                ...Marko._.givenAttrTags("row"),
                ...Marko._.attrTags(
                  __marko_internal_module_6,
                  "section",
                )([
                  {
                    row: {
                      id: 1,
                      ["content"]: (r: { name: string }) => {
                        [r.name];
                        return Marko._.voidReturn;
                      },
                      [Symbol.iterator]: Marko._.any,
                    },
                  },
                  {
                    row: {
                      id: 2,
                      ["content"]: (r) => {
                        [r.name];
                        return Marko._.voidReturn;
                      },
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
    ...Marko._.givenAttrTags("section"),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("./tags/pick/index.marko");
declare function __marko_internal_module_2(): typeof import("./tags/a-grid/index.marko");
declare function __marko_internal_module_3(): typeof import("./tags/req-grid/index.marko");
declare function __marko_internal_module_4(): typeof import("./tags/id-grid/index.marko");
declare function __marko_internal_module_5(): typeof import("./tags/gtable/index.marko");
declare function __marko_internal_module_6(): typeof import("./tags/gpanel/index.marko");
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
function __marko_internal_renderer_4(
  template = __marko_internal_module_4().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
function __marko_internal_renderer_5(
  template = __marko_internal_module_5().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
function __marko_internal_renderer_6(
  template = __marko_internal_module_6().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
