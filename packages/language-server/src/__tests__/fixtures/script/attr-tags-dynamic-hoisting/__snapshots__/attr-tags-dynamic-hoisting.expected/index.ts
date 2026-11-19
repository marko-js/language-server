const users = [{ name: "a" }, { name: "b" }];
const cols = ["x", "y"];
const flag = Math.random() > 0.5;
const list = [1, 2];
export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const Box = Marko._.hoist(() => __marko_internal_hoist__Box);
  const Untyped = Marko._.hoist(() => __marko_internal_hoist__Untyped);
  const fromRepeated = Marko._.hoist(
    () => __marko_internal_hoist__fromRepeated,
  );
  const fromIf = Marko._.hoist(() => __marko_internal_hoist__fromIf);
  const fromFor = Marko._.hoist(() => __marko_internal_hoist__fromFor);
  const fromContent = Marko._.hoist(() => __marko_internal_hoist__fromContent);
  const fromNested = Marko._.hoist(() => __marko_internal_hoist__fromNested);
  const fromDefine = Marko._.hoist(() => __marko_internal_hoist__fromDefine);
  const fromUntyped = Marko._.hoist(() => __marko_internal_hoist__fromUntyped);
  const fromLoop = Marko._.hoist(() => __marko_internal_hoist__fromLoop);
  const besideError = Marko._.hoist(() => __marko_internal_hoist__besideError);
  const fromScriptletIf = Marko._.hoist(
    () => __marko_internal_hoist__fromScriptletIf,
  );
  const fromCell = Marko._.hoist(() => __marko_internal_hoist__fromCell);
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@section"];
    input["@section"];
  });
  const __marko_internal_rendered_1 = __marko_internal_renderer_1(
    __marko_internal_module_1().default,
  )(
    // Repeated
    {
      section: {
        ["content"]: (() => {
          {
            const fromRepeated = Marko._.returned(
              () => __marko_internal_rendered_2,
            );
            const __marko_internal_rendered_2 =
              __marko_internal_module_2().default._({
                value: () => "repeated" as const,
              });
            return () => {
              return new (class MarkoReturn<Return = void> {
                readonly [Marko._.scope] = { fromRepeated };
                declare return: Return;
                constructor(_?: Return) {}
              })();
            };
          }
        })(),
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          section: {
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@section"];
    input["@section"];
  });
  const __marko_internal_rendered_3 = __marko_internal_renderer_1(
    __marko_internal_module_1().default,
  )(
    // In an if
    {
      section: {
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              section: {
                ["content"]: (() => {
                  {
                    const fromIf = Marko._.returned(
                      () => __marko_internal_rendered_4,
                    );
                    const __marko_internal_rendered_4 =
                      __marko_internal_module_2().default._({
                        value: () => "if" as const,
                      });
                    return () => {
                      return new (class MarkoReturn<Return = void> {
                        readonly [Marko._.scope] = { fromIf };
                        declare return: Return;
                        constructor(_?: Return) {}
                      })();
                    };
                  }
                })(),
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
    },
  );
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@section"];
  });
  const __marko_internal_rendered_5 = __marko_internal_renderer_1(
    __marko_internal_module_1().default,
  )(
    // In a for
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: list,
          },
          (i) =>
            Marko._.attrTags(__marko_internal_module_1)([
              {
                section: {
                  ["content"]: (() => {
                    {
                      const fromFor = Marko._.returned(
                        () => __marko_internal_rendered_6,
                      );
                      const __marko_internal_rendered_6 =
                        __marko_internal_module_2().default._({
                          value: () => i,
                        });
                      return () => {
                        return new (class MarkoReturn<Return = void> {
                          readonly [Marko._.scope] = { fromFor };
                          declare return: Return;
                          constructor(_?: Return) {}
                        })();
                      };
                    }
                  })(),
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
        ),
      ],
      ...Marko._.givenAttrTags("section"),
    },
  );
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@section"];
    input["@section"];
    Marko._.nestedAttrTagNames(input["@section"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  const __marko_internal_rendered_7 = __marko_internal_renderer_1(
    __marko_internal_module_1().default,
  )(
    // Nested, beside the tag's own content
    {
      section: {
        ...Marko._.givenAttrTags("row"),
        ...Marko._.attrTags(
          __marko_internal_module_1,
          "section",
        )([
          {
            row: {
              ["content"]: (() => {
                {
                  const fromNested = Marko._.returned(
                    () => __marko_internal_rendered_8,
                  );
                  const __marko_internal_rendered_8 =
                    __marko_internal_module_2().default._({
                      value: () => "nested" as const,
                    });
                  return () => {
                    return new (class MarkoReturn<Return = void> {
                      readonly [Marko._.scope] = { fromNested };
                      declare return: Return;
                      constructor(_?: Return) {}
                    })();
                  };
                }
              })(),
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            row: {
              [Symbol.iterator]: Marko._.any,
            },
          },
        ]),
        [Symbol.iterator]: Marko._.any,
      },
      ["content"]: (() => {
        {
          const fromContent = Marko._.returned(
            () => __marko_internal_rendered_9,
          );
          const __marko_internal_rendered_9 =
            __marko_internal_module_2().default._({
              value: () => "content" as const,
            });
          return () => {
            return new (class MarkoReturn<Return = void> {
              readonly [Marko._.scope] = { fromContent };
              declare return: Return;
              constructor(_?: Return) {}
            })();
          };
        }
      })(),
      [Marko._.restAttrTags]: [
        {
          section: {
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  {
    const Box = Marko._.returned(() => __marko_internal_rendered_10);
    const __marko_internal_rendered_10 = __marko_internal_module_3().default._({
      // A <define> tag
      [Marko._.contentFor(__marko_internal_module_3)]: (input: {
        section?: Marko.AttrTag<{ content?: Marko.Body }>;
      }) => {
        Marko._.forOfTag(
          {
            of: input.section,
          },
          (section) => {
            const __marko_internal_tag_11 = section.content;
            Marko._.renderDynamicTag(__marko_internal_tag_11)({});
            return Marko._.voidReturn;
          },
        );
        return Marko._.voidReturn;
      },
    });
    const __marko_internal_tag_12 = Box;
    Marko._.attrTagNames(__marko_internal_tag_12, (input) => {
      input["@section"];
      input["@section"];
    });
    const __marko_internal_rendered_12 =
      Marko._.renderDynamicTagWithRestAttrTags(
        __marko_internal_tag_12,
        Marko._.signature(__marko_internal_tag_12),
        Marko._.actualInput,
      )({
        section: {
          [Marko._.contentFor(__marko_internal_tag_12, "section")]: (() => {
            {
              const fromDefine = Marko._.returned(
                () => __marko_internal_rendered_13,
              );
              const __marko_internal_rendered_13 =
                __marko_internal_module_2().default._({
                  value: () => "define" as const,
                });
              return () => {
                return new (class MarkoReturn<Return = void> {
                  readonly [Marko._.scope] = { fromDefine };
                  declare return: Return;
                  constructor(_?: Return) {}
                })();
              };
            }
          })(),
          [Symbol.iterator]: Marko._.any,
        },
        [Marko._.restAttrTags]: [
          flag
            ? {
                section: {
                  [Symbol.iterator]: Marko._.any,
                },
              }
            : Marko._.never,
        ],
      });
    {
      const Untyped = Marko._.returned(() => __marko_internal_rendered_14);
      const __marko_internal_rendered_14 =
        __marko_internal_module_3().default._({
          // An untyped tag
          [Marko._.contentFor(__marko_internal_module_3)]: (input: any) => {
            const __marko_internal_tag_15 = input.section;
            Marko._.renderDynamicTag(__marko_internal_tag_15)({});
            return Marko._.voidReturn;
          },
        });
      const __marko_internal_tag_16 = Untyped;
      Marko._.attrTagNames(__marko_internal_tag_16, (input) => {
        input["@section"];
        input["@section"];
      });
      const __marko_internal_rendered_16 =
        Marko._.renderDynamicTagWithRestAttrTags(
          __marko_internal_tag_16,
          Marko._.signature(__marko_internal_tag_16),
          Marko._.actualInput,
        )({
          section: {
            [Symbol.iterator]: Marko._.any,
          },
          [Marko._.restAttrTags]: [
            Marko._.forOfAttrTag(
              {
                of: list,
              },
              (i) =>
                Marko._.attrTags(__marko_internal_tag_16)([
                  {
                    section: {
                      [Marko._.contentFor(__marko_internal_tag_16, "section")]:
                        (() => {
                          {
                            const fromUntyped = Marko._.returned(
                              () => __marko_internal_rendered_17,
                            );
                            const __marko_internal_rendered_17 =
                              __marko_internal_module_2().default._({
                                value: () => i,
                              });
                            return () => {
                              return new (class MarkoReturn<Return = void> {
                                readonly [Marko._.scope] = { fromUntyped };
                                declare return: Return;
                                constructor(_?: Return) {}
                              })();
                            };
                          }
                        })(),
                      [Symbol.iterator]: Marko._.any,
                    },
                  },
                ]),
            ),
          ],
        });
      __marko_internal_module_4().default._({
        async value() {
          fromRepeated;
          // ^?
          fromIf;
          // ^?
          fromFor;
          // ^?
          fromContent;
          // ^?
          fromNested;
          // ^?
          fromDefine;
          // ^?
          fromUntyped;
          // ^?
        },
      });
      Marko._.attrTagNames(__marko_internal_module_5, (input) => {
        input["@column"];
      });
      const __marko_internal_rendered_18 = __marko_internal_renderer_2(
        __marko_internal_module_5().default,
      )(
        // A tag variable hoisted out of a <for>'s attribute tag
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
                      ["content"]: (() => {
                        {
                          const fromLoop = Marko._.returned(
                            () => __marko_internal_rendered_19,
                          );
                          const __marko_internal_rendered_19 =
                            __marko_internal_module_2().default._({
                              value: () => c,
                            });
                          return () => {
                            return new (class MarkoReturn<Return = void> {
                              readonly [Marko._.scope] = { fromLoop };
                              declare return: Return;
                              constructor(_?: Return) {}
                            })();
                          };
                        }
                      })(),
                      [Symbol.iterator]: Marko._.any,
                    },
                  },
                ]),
            ),
          ],
          ...Marko._.givenAttrTags("column"),
        },
      );
      __marko_internal_module_4().default._({
        async value() {
          fromLoop;
          //    ^?
        },
      });
      Marko._.attrTagNames(__marko_internal_module_5, (input) => {
        input["@column"];
        input["@column"];
      });
      const __marko_internal_rendered_20 = __marko_internal_renderer_2(
        __marko_internal_module_5().default,
      )(
        // A tag variable hoisted from an attribute tag beside one with an error: its
        // type is lost with the tag's input (TypeScript drops a failed call's
        // inference when its argument has an unannotated param)
        {
          rows: users,
          column: {
            title: 1,
            [Symbol.iterator]: Marko._.any,
          },
          [Marko._.restAttrTags]: [
            flag
              ? {
                  column: {
                    title: "a",
                    ["content"]: (row) => {
                      {
                        const besideError = Marko._.returned(
                          () => __marko_internal_rendered_21,
                        );
                        const __marko_internal_rendered_21 =
                          __marko_internal_module_2().default._({
                            value: () => row,
                          });
                        return new (class MarkoReturn<Return = void> {
                          readonly [Marko._.scope] = { besideError };
                          declare return: Return;
                          constructor(_?: Return) {}
                        })();
                      }
                    },
                    [Symbol.iterator]: Marko._.any,
                  },
                }
              : Marko._.never,
          ],
        },
      );
      __marko_internal_module_4().default._({
        async value() {
          besideError;
          //    ^?
        },
      });
      Marko._.attrTagNames(__marko_internal_module_1, (input) => {
        input["@section"];
        input["@section"];
      });
      const __marko_internal_rendered_22 = __marko_internal_renderer_1(
        __marko_internal_module_1().default,
      )(
        // A tag variable hoisted out of an attribute tag in an <if> with a scriptlet
        {
          section: {
            [Symbol.iterator]: Marko._.any,
          },
          [Marko._.restAttrTags]: [
            flag
              ? (() => {
                  const label = "scriptlet";
                  return Marko._.attrTags(__marko_internal_module_1)([
                    {
                      section: {
                        ["content"]: (() => {
                          {
                            const fromScriptletIf = Marko._.returned(
                              () => __marko_internal_rendered_23,
                            );
                            const __marko_internal_rendered_23 =
                              __marko_internal_module_2().default._({
                                value: () => label,
                              });
                            return () => {
                              return new (class MarkoReturn<Return = void> {
                                readonly [Marko._.scope] = { fromScriptletIf };
                                declare return: Return;
                                constructor(_?: Return) {}
                              })();
                            };
                          }
                        })(),
                        [Symbol.iterator]: Marko._.any,
                      },
                    },
                  ]);
                })()
              : Marko._.never,
          ],
        },
      );
      __marko_internal_module_4().default._({
        async value() {
          fromScriptletIf;
          //    ^?
        },
      });
      Marko._.attrTagNames(__marko_internal_module_1, (input) => {
        input["@section"];
        Marko._.nestedAttrTagNames(input["@section"], (input) => {
          input["@row"];
          input["@row"];
          input["@cell"];
        });
      });
      const __marko_internal_rendered_24 = __marko_internal_renderer_3(
        __marko_internal_module_1().default,
      )(
        // A tag variable hoisted out of a nested attribute tag between two of another
        // name: typed, as each group gives its own names
        {
          section: {
            ...Marko._.givenAttrTags("row", "cell"),
            ...Marko._.attrTags(
              __marko_internal_module_1,
              "section",
            )([
              {
                row: {
                  [Symbol.iterator]: Marko._.any,
                },
                cell: {
                  ["content"]: (() => {
                    {
                      const fromCell = Marko._.returned(
                        () => __marko_internal_rendered_25,
                      );
                      const __marko_internal_rendered_25 =
                        __marko_internal_module_2().default._({
                          value: () => "cell" as const,
                        });
                      return () => {
                        return new (class MarkoReturn<Return = void> {
                          readonly [Marko._.scope] = { fromCell };
                          declare return: Return;
                          constructor(_?: Return) {}
                        })();
                      };
                    }
                  })(),
                  [Symbol.iterator]: Marko._.any,
                },
              },
              {
                row: {
                  [Symbol.iterator]: Marko._.any,
                },
              },
            ]),
            [Symbol.iterator]: Marko._.any,
          },
        },
      );
      __marko_internal_module_4().default._({
        async value() {
          fromCell;
          //    ^?
        },
      });
      var __marko_internal_hoist__Box = Box;
      var __marko_internal_hoist__Untyped = Untyped;
      var {
        fromRepeated: __marko_internal_hoist__fromRepeated,
        fromIf: __marko_internal_hoist__fromIf,
        fromFor: __marko_internal_hoist__fromFor,
        fromContent: __marko_internal_hoist__fromContent,
        fromNested: __marko_internal_hoist__fromNested,
        fromDefine: __marko_internal_hoist__fromDefine,
        fromUntyped: __marko_internal_hoist__fromUntyped,
        fromLoop: __marko_internal_hoist__fromLoop,
        besideError: __marko_internal_hoist__besideError,
        fromScriptletIf: __marko_internal_hoist__fromScriptletIf,
        fromCell: __marko_internal_hoist__fromCell,
      } = Marko._.hoisted(
        Marko._.readScopes({
          __marko_internal_rendered_1,
          __marko_internal_rendered_3,
          __marko_internal_rendered_5,
          __marko_internal_rendered_7,
          __marko_internal_rendered_12,
          __marko_internal_rendered_16,
          __marko_internal_rendered_18,
          __marko_internal_rendered_20,
          __marko_internal_rendered_22,
          __marko_internal_rendered_24,
        }),
      );
    }
  }
  Marko._.noop({
    Box,
    Untyped,
    fromRepeated,
    fromIf,
    fromFor,
    fromContent,
    fromNested,
    fromDefine,
    fromUntyped,
    fromLoop,
    besideError,
    fromScriptletIf,
    fromCell,
    input,
    $global,
    $signal,
  });
});
declare function __marko_internal_module_1(): typeof import("./tags/panel/index.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_3(): typeof import("@marko/runtime-tags/tags/define.d.marko");
declare function __marko_internal_module_4(): typeof import("marko/src/core-tags/core/script.d.marko");
declare function __marko_internal_module_5(): typeof import("./tags/gtable/index.marko");
function __marko_internal_renderer_3(
  template = __marko_internal_module_1().default,
) {
  return Marko._.renderer(template._, Marko._.actualInput);
}
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
function __marko_internal_renderer_2(
  template = __marko_internal_module_5().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
