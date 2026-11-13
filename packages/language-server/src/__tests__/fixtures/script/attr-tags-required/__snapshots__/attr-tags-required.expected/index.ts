const tuple = ["x", "y"] as const;
const cols = ["x", "y"];
import ReqMenu from "./tags/req-menu/index.marko";
import RMenu from "./tags/rmenu/index.marko";
const flag = Math.random() > 0.5;
// An attribute tag replaces a spread's attribute of its name, as Marko
// writes each attribute tag after the attributes (as nothing, if none is given).
const spread = { title: "a", req: ["x", "y"] };
const withReq = { req: { label: "a", *[Symbol.iterator]() {} } };
export interface Input {}
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
  const Req = Marko._.hoist(() => __marko_internal_hoist__Req);
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("./tags/req-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@req"];
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1)(Marko._.withRestAttrTags)()(
    // Every branch has it
    {
      [Marko._.restAttrTags]: [
        flag
          ? {
              req: {
                label: "a",
                [Symbol.iterator]: Marko._.any,
              },
            }
          : {
              req: {
                label: "b",
                [Symbol.iterator]: Marko._.any,
              },
            },
      ],
      ...Marko._.givenAttrTags("req"),
    },
  );
  const __marko_internal_tag_2 = Marko._.resolveTemplate(
    import("./tags/req-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@req"];
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_tag_2)(Marko._.withRestAttrTags)()(
    // Repeated, one with params (left out of TypeScript's first check)
    {
      req: {
        [Marko._.contentFor(__marko_internal_tag_2)]: (n) => {
          [n];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          req: {
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  const __marko_internal_tag_3 = Marko._.resolveTemplate(
    import("./tags/req-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@req"];
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_tag_3)(Marko._.withRestAttrTags)()(
    // Static, then possibly another
    {
      req: {
        [Marko._.contentFor(__marko_internal_tag_3)]: (n) => {
          [n];
          return Marko._.voidReturn;
        },
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
  const __marko_internal_tag_4 = Marko._.resolveTemplate(
    import("./tags/req-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_tag_4)(Marko._.withRestAttrTags)()(
    // Only in an <if>, with an attribute: given, though not by every render
    {
      title: "x",
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
    },
  );
  const __marko_internal_tag_5 = Marko._.resolveTemplate(
    import("./tags/req-menu/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@req"];
  });
  Marko._.renderTemplate(__marko_internal_tag_5)(Marko._.withRestAttrTags)()(
    // Only in a while: given
    {
      [Marko._.restAttrTags]: [
        undefined
          ? {
              req: {
                [Symbol.iterator]: Marko._.any,
              },
            }
          : Marko._.never,
      ],
      ...Marko._.givenAttrTags("req"),
    },
  );
  const __marko_internal_tag_6 = ReqMenu;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@req"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_6)(Marko._.withRestAttrTags)()(
    // Only in an <if>, by a dynamic tag: given
    {
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
    },
  );
  const __marko_internal_tag_7 = flag ? ReqMenu : RMenu;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@req"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_7)(Marko._.withRestAttrTags)()(
    // Only in an <if>, by one of several templates, with no other attribute: given
    {
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
    },
  );
  const __marko_internal_tag_8 = Marko._.resolveTemplate(
    import("@marko/runtime-tags/tags/define.d.marko"),
  ).default;
  {
    const Req = Marko._.returned(() => __marko_internal_rendered_8);
    const __marko_internal_rendered_8 = Marko._.renderTemplate(
      __marko_internal_tag_8,
    )()()({
      // By a <define> tag
      [Marko._.contentFor(__marko_internal_tag_8)]: (input: {
        req: Marko.AttrTag<{ content?: Marko.Body }>;
      }) => {
        const __marko_internal_tag_9 = input.req.content;
        Marko._.renderDynamicTag(__marko_internal_tag_9)()()({});
        return Marko._.voidReturn;
      },
    });
    const __marko_internal_tag_10 = Req;
    Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
      input["@req"];
      input["@req"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_10)(
      Marko._.withRestAttrTags,
    )()({
      req: {
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          req: {
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    });
    const __marko_internal_tag_11 = Req;
    Marko._.attrTagNames(__marko_internal_tag_11, (input) => {
      input["@req"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_11)(
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
    const __marko_internal_tag_12 = Marko._.resolveTemplate(
      import("./tags/req-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_12, (input) => {
      input["@req"];
      input["@req"];
    });
    Marko._.renderTemplate(__marko_internal_tag_12)(Marko._.withRestAttrTags)()(
      // An unknown attribute, with the attribute tag given
      {
        bogus: 1,
        req: {
          [Symbol.iterator]: Marko._.any,
        },
        [Marko._.restAttrTags]: [
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
        ],
      },
    );
    const __marko_internal_tag_13 = Marko._.resolveTemplate(
      import("./tags/idx-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_13, (input) => {
      input["@req"];
      input["@req"];
    });
    Marko._.renderTemplate(__marko_internal_tag_13)(Marko._.withRestAttrTags)()(
      // An input with an index signature
      {
        other: 1,
        req: {
          [Symbol.iterator]: Marko._.any,
        },
        [Marko._.restAttrTags]: [
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
        ],
      },
    );
    const __marko_internal_tag_14 = Marko._.resolveTemplate(
      import("./tags/idx-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_14, (input) => {
      input["@req"];
    });
    Marko._.renderTemplate(__marko_internal_tag_14)(Marko._.withRestAttrTags)()(
      {
        other: 1,
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
      },
    );
    const __marko_internal_tag_15 = Marko._.resolveTemplate(
      import("./tags/req-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_15, (input) => {
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
    });
    Marko._.renderTemplate(__marko_internal_tag_15)(Marko._.withRestAttrTags)()(
      // Repeated 50 times, as rest attribute tags and in a for (each merged by name)
      {
        req: {
          [Symbol.iterator]: Marko._.any,
        },
        [Marko._.restAttrTags]: [
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            req: {
              [Symbol.iterator]: Marko._.any,
            },
          },
        ],
      },
    );
    const __marko_internal_tag_16 = Marko._.resolveTemplate(
      import("./tags/req-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_16, (input) => {
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
      input["@req"];
    });
    Marko._.renderTemplate(__marko_internal_tag_16)(Marko._.withRestAttrTags)()(
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: [1] as const,
            },
            () =>
              Marko._.attrTags(__marko_internal_tag_16)([
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
                {
                  req: {
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("req"),
      },
    );
    const __marko_internal_tag_17 = Marko._.resolveTemplate(
      import("./tags/rmenu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_17, (input) => {
      input["@item"];
    });
    Marko._.renderTemplate(__marko_internal_tag_17)(Marko._.withRestAttrTags)()(
      // Required only in a <for> over an array literal
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: ["x", "y"],
            },
            (t) =>
              Marko._.attrTags(__marko_internal_tag_17)([
                {
                  item: {
                    label: t,
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("item"),
      },
    );
    const __marko_internal_tag_18 = Marko._.resolveTemplate(
      import("./tags/rmenu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_18, (input) => {
      input["@item"];
    });
    Marko._.renderTemplate(__marko_internal_tag_18)(Marko._.withRestAttrTags)()(
      // Required only in a <for> over a non-empty const tuple
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: tuple,
            },
            (t) =>
              Marko._.attrTags(__marko_internal_tag_18)([
                {
                  item: {
                    label: t,
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("item"),
      },
    );
    const __marko_internal_tag_19 = Marko._.resolveTemplate(
      import("./tags/rmenu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_19, (input) => {
      input["@item"];
    });
    Marko._.renderTemplate(__marko_internal_tag_19)(Marko._.withRestAttrTags)()(
      // Required only in a <for to=3>
      {
        [Marko._.restAttrTags]: [
          Marko._.forToAttrTag(
            {
              to: 3,
            },
            (i) =>
              Marko._.attrTags(__marko_internal_tag_19)([
                {
                  item: {
                    label: String(i),
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("item"),
      },
    );
    const __marko_internal_tag_20 = Marko._.resolveTemplate(
      import("./tags/rmenu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_20, (input) => {
      input["@item"];
    });
    Marko._.renderTemplate(__marko_internal_tag_20)(Marko._.withRestAttrTags)()(
      // Required only in a <for> over a possibly empty list: given
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: cols,
            },
            (t) =>
              Marko._.attrTags(__marko_internal_tag_20)([
                {
                  item: {
                    label: t,
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("item"),
      },
    );
    const __marko_internal_tag_21 = Marko._.resolveTemplate(
      import("./tags/rgrid/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_21, (input) => {
      input["@section"];
      Marko._.nestedAttrTagNames(input["@section"], (input) => {
        input["@row"];
        input["@row"];
      });
    });
    Marko._.renderTemplate(__marko_internal_tag_21)(Marko._.withRestAttrTags)()(
      // Nested required, in an attribute tag in a loop
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: [1, 2],
            },
            (i) =>
              Marko._.attrTags(__marko_internal_tag_21)([
                {
                  section: {
                    ...Marko._.givenAttrTags("row"),
                    ...Marko._.attrTags(
                      __marko_internal_tag_21,
                      "section",
                    )([
                      {
                        row: {
                          label: `${i}`,
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
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("section"),
      },
    );
    const __marko_internal_tag_22 = Marko._.resolveTemplate(
      import("./tags/rgrid/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_22, (input) => {
      input["@section"];
      Marko._.nestedAttrTagNames(input["@section"], (input) => {
        input["@row"];
      });
    });
    Marko._.renderTemplate(__marko_internal_tag_22)(Marko._.withRestAttrTags)()(
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: [1, 2],
            },
            (i) =>
              Marko._.attrTags(__marko_internal_tag_22)([
                {
                  section: {
                    ...Marko._.givenAttrTags("row"),
                    ...Marko._.forOfAttrTag(
                      {
                        of: [i],
                      },
                      (j) =>
                        Marko._.attrTags(
                          __marko_internal_tag_22,
                          "section",
                        )([
                          {
                            row: {
                              label: `${j}`,
                              [Symbol.iterator]: Marko._.any,
                            },
                          },
                        ]),
                    ),
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("section"),
      },
    );
    const __marko_internal_tag_23 = Marko._.resolveTemplate(
      import("./tags/rgrid/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_23, (input) => {
      input["@section"];
      Marko._.nestedAttrTagNames(input["@section"], (input) => {
        input["@row"];
        input["@row"];
      });
    });
    Marko._.renderTemplate(__marko_internal_tag_23)(Marko._.withRestAttrTags)()(
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: [1, 2],
            },
            (i) =>
              Marko._.attrTags(__marko_internal_tag_23)([
                {
                  section: {
                    ...Marko._.givenAttrTags("row"),
                    ...Marko._.attrTags(
                      __marko_internal_tag_23,
                      "section",
                    )([
                      i === 2
                        ? {
                            row: {
                              [Symbol.iterator]: Marko._.any,
                            },
                          }
                        : {
                            row: {
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
      },
    );
    const __marko_internal_tag_24 = Marko._.resolveTemplate(
      import("./tags/idx-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_24, (input) => {
      input["@other"];
      input["@other"];
    });
    Marko._.renderTemplate(__marko_internal_tag_24)(Marko._.withRestAttrTags)()(
      // Given nowhere, by a tag with rest attribute tags => error
      {
        other: {
          [Symbol.iterator]: Marko._.any,
        },
        [Marko._.restAttrTags]: [
          {
            other: {
              [Symbol.iterator]: Marko._.any,
            },
          },
        ],
      },
    );
    const __marko_internal_tag_25 = Marko._.resolveTemplate(
      import("./tags/idx-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_25, (input) => {
      input["@other"];
    });
    Marko._.renderTemplate(__marko_internal_tag_25)(Marko._.withRestAttrTags)()(
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: cols,
            },
            (t) =>
              Marko._.attrTags(__marko_internal_tag_25)([
                {
                  other: {
                    label: t,
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("other"),
      },
    );
    const __marko_internal_tag_26 = Marko._.resolveTemplate(
      import("./tags/req-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_26, (input) => {
      input["@req"];
    });
    Marko._.renderTemplate(__marko_internal_tag_26)(Marko._.withRestAttrTags)()(
      // The spread's is not checked: a <for> gives it
      {
        ...spread,
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: tuple,
            },
            (label) =>
              Marko._.attrTags(__marko_internal_tag_26)([
                {
                  req: {
                    label: label,
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("req"),
      },
    );
    const __marko_internal_tag_27 = Marko._.resolveTemplate(
      import("./tags/req-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_27, (input) => {
      input["@req"];
    });
    Marko._.renderTemplate(__marko_internal_tag_27)(Marko._.withRestAttrTags)()(
      // The spread's is replaced by one that might be missing: given
      {
        ...withReq,
        [Marko._.restAttrTags]: [
          flag
            ? {
                req: {
                  label: "a",
                  [Symbol.iterator]: Marko._.any,
                },
              }
            : Marko._.never,
        ],
        ...Marko._.givenAttrTags("req"),
      },
    );
    const __marko_internal_tag_28 = Marko._.resolveTemplate(
      import("./tags/req-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_28, (input) => {
      input["@req"];
    });
    Marko._.renderTemplate(__marko_internal_tag_28)(Marko._.withRestAttrTags)()(
      {
        ...withReq,
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: cols,
            },
            (label) =>
              Marko._.attrTags(__marko_internal_tag_28)([
                {
                  req: {
                    label: label,
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("req"),
      },
    );
    const __marko_internal_tag_29 = Marko._.resolveTemplate(
      import("./tags/req-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_29, (input) => {
      input["@req"];
    });
    Marko._.renderTemplate(__marko_internal_tag_29)(Marko._.withRestAttrTags)()(
      // The spread's other attributes are still checked => error
      {
        ...{ title: 1 },
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: tuple,
            },
            (label) =>
              Marko._.attrTags(__marko_internal_tag_29)([
                {
                  req: {
                    label: label,
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("req"),
      },
    );
    const __marko_internal_tag_30 = Marko._.resolveTemplate(
      import("./tags/req-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_30, (input) => {
      input["@req"];
      input["@req"];
    });
    Marko._.renderTemplate(__marko_internal_tag_30)(Marko._.withRestAttrTags)()(
      // Written once, it is the attribute already
      {
        ...spread,
        req: {
          label: "a",
          [Symbol.iterator]: Marko._.any,
        },
        [Marko._.restAttrTags]: [
          flag
            ? {
                req: {
                  label: "b",
                  [Symbol.iterator]: Marko._.any,
                },
              }
            : Marko._.never,
        ],
      },
    );
    const __marko_internal_tag_31 = Marko._.resolveTemplate(
      import("./tags/req-menu/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_31, (input) => {
      input["@req"];
    });
    Marko._.renderTemplate(__marko_internal_tag_31)(Marko._.withRestAttrTags)()(
      // An attribute of an attribute tag's name, the attribute tag in a <for>:
      // reported as overwritten, as Marko replaces it with the attribute tag
      {
        req: 1,
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: tuple,
            },
            (label) =>
              Marko._.attrTags(__marko_internal_tag_31)([
                {
                  req: {
                    label: label,
                    [Symbol.iterator]: Marko._.any,
                  },
                },
              ]),
          ),
        ],
        ...Marko._.givenAttrTags("req"),
      },
    );
    const __marko_internal_tag_32 = Marko._.resolveTemplate(
      import("./tags/rgrid/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_32, (input) => {
      input["@section"];
      Marko._.nestedAttrTagNames(input["@section"], (input) => {
        input["@row"];
      });
    });
    Marko._.renderTemplate(__marko_internal_tag_32)()()(
      // A required nested attribute tag given only in an <if> with a scriptlet, and
      // with its attribute tag in a <for>: given
      {
        section: {
          ...Marko._.givenAttrTags("row"),
          ...Marko._.attrTags(
            __marko_internal_tag_32,
            "section",
          )([
            flag
              ? (() => {
                  const label = "a";
                  return Marko._.attrTags(
                    __marko_internal_tag_32,
                    "section",
                  )([
                    {
                      row: {
                        label: label,
                        [Symbol.iterator]: Marko._.any,
                      },
                    },
                  ]);
                })()
              : Marko._.never,
          ]),
          [Symbol.iterator]: Marko._.any,
        },
      },
    );
    const __marko_internal_tag_33 = Marko._.resolveTemplate(
      import("./tags/rgrid/index.marko"),
    ).default;
    Marko._.attrTagNames(__marko_internal_tag_33, (input) => {
      input["@section"];
      Marko._.nestedAttrTagNames(input["@section"], (input) => {
        input["@row"];
      });
    });
    Marko._.renderTemplate(__marko_internal_tag_33)(Marko._.withRestAttrTags)()(
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: cols,
            },
            (label) =>
              Marko._.attrTags(__marko_internal_tag_33)([
                {
                  section: {
                    ...Marko._.givenAttrTags("row"),
                    ...Marko._.attrTags(
                      __marko_internal_tag_33,
                      "section",
                    )([
                      flag
                        ? {
                            row: {
                              label: label,
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
        ...Marko._.givenAttrTags("section"),
      },
    );
    var __marko_internal_hoist__Req = Req;
  }
  Marko._.noop({ Req, component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
