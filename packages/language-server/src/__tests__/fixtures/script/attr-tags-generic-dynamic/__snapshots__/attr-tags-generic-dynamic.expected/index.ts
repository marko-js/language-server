const users = [{ name: "a" }, { name: "b" }];
const cols = ["x", "y"];
const groups = [{ items: ["p", "q"] }];
const record = { a: 1, b: 2 } as const;
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
  const flag = Math.random() > 0.5;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // From an attribute, repeated
    {
      value: "a",
      option: {
        value: "b",
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // From an attribute, in an if
    {
      value: 1,
      [Marko._.restAttrTags]: [
        flag
          ? {
              option: {
                value: 2,
                [Marko._.contentFor(__marko_internal_module_1)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // From an attribute and the attribute tags, as const
    {
      value: "a" as const,
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
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
    value: "a" as const,
    option: {
      value: "a",
      [Marko._.contentFor(__marko_internal_module_1)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    value: "a" as const,
    option: {
      value: "a" as const,
      [Marko._.contentFor(__marko_internal_module_1)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    option: {
      value: 1,
      [Symbol.iterator]: Marko._.any,
    },
    // From the attribute tags, into the tag's own content
    [Marko._.contentFor(__marko_internal_module_1)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
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
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)<2>()<number>()(
    // Given type arguments
    {
      option: {
        value: 1,
        [Marko._.contentFor(__marko_internal_module_1)]: (v) => {
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
  Marko._.renderTemplate(__marko_internal_module_2().default)(
    Marko._.withRestAttrTags,
  )()(
    // From an attribute, into repeated attribute tags' params
    {
      rows: [{ id: "a" }],
      column: {
        header: "Id",
        [Marko._.contentFor(__marko_internal_module_2)]: ({ row }) => {
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
            [Marko._.contentFor(__marko_internal_module_2)]: ({ row }) => {
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
  Marko._.renderTemplate(__marko_internal_module_2().default)<2>()<{
    id: string;
  }>()({
    rows: [],
    column: {
      header: "Id",
      [Marko._.contentFor(__marko_internal_module_2)]: ({ row }) => {
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
          [Marko._.contentFor(__marko_internal_module_2)]: ({ row }) => {
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
  Marko._.renderTemplate(__marko_internal_module_3().default)(
    Marko._.withRestAttrTags,
  )()(
    // A required attribute tag, from an attribute: repeated, in an if, in a for
    {
      rows: [{ id: "a" }],
      sort(a, b) {
        return a.id.localeCompare(b.id);
      },
      column: {
        header: "Id",
        [Marko._.contentFor(__marko_internal_module_3)]: (row) => {
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
            [Marko._.contentFor(__marko_internal_module_3)]: (row) => {
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
  Marko._.renderTemplate(__marko_internal_module_3().default)(
    Marko._.withRestAttrTags,
  )()({
    rows: [{ id: "a" }],
    sort(a, b) {
      return a.id.localeCompare(b.id);
    },
    [Marko._.restAttrTags]: [
      flag
        ? {
            column: {
              header: "Id",
              [Marko._.contentFor(__marko_internal_module_3)]: (row) => {
                [row.id];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          }
        : {
            column: {
              header: "Id again",
              [Marko._.contentFor(__marko_internal_module_3)]: (row) => {
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
  Marko._.renderTemplate(__marko_internal_module_3().default)(
    Marko._.withRestAttrTags,
  )()({
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
  Marko._.renderTemplate(__marko_internal_module_4().default)(
    Marko._.withRestAttrTags,
  )()(
    // The same, with a constrained type parameter
    {
      rows: [{ id: "a", name: "A" }],
      sort(a, b) {
        return a.name.localeCompare(b.name);
      },
      column: {
        header: "Name",
        [Marko._.contentFor(__marko_internal_module_4)]: (row) => {
          [row.name];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          column: {
            header: "Id",
            [Marko._.contentFor(__marko_internal_module_4)]: (row) => {
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
  Marko._.renderTemplate(__marko_internal_module_4().default)(
    Marko._.withRestAttrTags,
  )()({
    rows: [{ id: "a", name: "A" }],
    sort(a, b) {
      return a.name.localeCompare(b.name);
    },
    [Marko._.restAttrTags]: [
      flag
        ? {
            column: {
              header: "Name",
              [Marko._.contentFor(__marko_internal_module_4)]: (row) => {
                [row.name];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          }
        : {
            column: {
              header: "Id",
              [Marko._.contentFor(__marko_internal_module_4)]: (row) => {
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
  Marko._.renderTemplate(__marko_internal_module_4().default)(
    Marko._.withRestAttrTags,
  )()({
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
  Marko._.renderTemplate(__marko_internal_module_5().default)(
    Marko._.withRestAttrTags,
  )()(
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
                  [Marko._.contentFor(__marko_internal_module_5)]: (row) => {
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
  Marko._.renderTemplate(__marko_internal_module_5().default)(
    Marko._.withRestAttrTags,
  )()(
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
                        [Marko._.contentFor(__marko_internal_module_5)]: (
                          row,
                        ) => {
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
  Marko._.renderTemplate(__marko_internal_module_5().default)(
    Marko._.withRestAttrTags,
  )()(
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
                      [Marko._.contentFor(__marko_internal_module_5)]: (
                        row,
                      ) => {
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
  Marko._.renderTemplate(__marko_internal_module_5().default)(
    Marko._.withRestAttrTags,
  )()(
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
                      [Marko._.contentFor(__marko_internal_module_5)]: (
                        row,
                      ) => {
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
  Marko._.renderTemplate(__marko_internal_module_5().default)(
    Marko._.withRestAttrTags,
  )()(
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
                  [Marko._.contentFor(__marko_internal_module_5)]: (row) => {
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
  Marko._.renderTemplate(__marko_internal_module_5().default)(
    Marko._.withRestAttrTags,
  )()(
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
                  [Marko._.contentFor(__marko_internal_module_5)]: (row) => {
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
  Marko._.renderTemplate(__marko_internal_module_5().default)(
    Marko._.withRestAttrTags,
  )()(
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
                    [Marko._.contentFor(__marko_internal_module_5)]: (row) => {
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
  Marko._.renderTemplate(__marko_internal_module_6().default)()()(
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
                  [Marko._.contentFor(__marko_internal_module_6)]: (r) => {
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
  Marko._.renderTemplate(__marko_internal_module_5().default)(
    Marko._.withRestAttrTags,
  )()(
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
                  [Marko._.contentFor(__marko_internal_module_5)]: (row) => {
                    Marko._.attrTagNames(__marko_internal_module_6, (input) => {
                      input["@section"];
                      Marko._.nestedAttrTagNames(input["@section"], (input) => {
                        input["@row"];
                      });
                    });
                    Marko._.renderTemplate(
                      __marko_internal_module_6().default,
                    )()()({
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
                                  [Marko._.contentFor(
                                    __marko_internal_module_6,
                                  )]: (r) => {
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
  Marko._.renderTemplate(__marko_internal_module_5().default)(
    Marko._.withRestAttrTags,
  )()(
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
                  [Marko._.contentFor(__marko_internal_module_5)]: (row: {
                    name: string;
                  }) => {
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
  Marko._.renderTemplate(__marko_internal_module_6().default)()()(
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
              [Marko._.contentFor(__marko_internal_module_6)]: (r: {
                name: string;
              }) => {
                [r.name];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            row: {
              id: 2,
              [Marko._.contentFor(__marko_internal_module_6)]: (r) => {
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
  Marko._.renderTemplate(__marko_internal_module_6().default)(
    Marko._.withRestAttrTags,
  )()({
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
                      [Marko._.contentFor(__marko_internal_module_6)]: (r: {
                        name: string;
                      }) => {
                        [r.name];
                        return Marko._.voidReturn;
                      },
                      [Symbol.iterator]: Marko._.any,
                    },
                  },
                  {
                    row: {
                      id: 2,
                      [Marko._.contentFor(__marko_internal_module_6)]: (r) => {
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
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./tags/pick/index.marko");
declare function __marko_internal_module_2(): typeof import("./tags/a-grid/index.marko");
declare function __marko_internal_module_3(): typeof import("./tags/req-grid/index.marko");
declare function __marko_internal_module_4(): typeof import("./tags/id-grid/index.marko");
declare function __marko_internal_module_5(): typeof import("./tags/gtable/index.marko");
declare function __marko_internal_module_6(): typeof import("./tags/gpanel/index.marko");
