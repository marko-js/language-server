const tuple = ["x", "y"] as const;
const cols = ["x", "y"];
import ReqMenu from "./tags/req-menu/index.marko";
import GenericClassBody from "./components/generic-class-body.marko";
import RMenu from "./tags/rmenu/index.marko";
const flag = Math.random() > 0.5;
// An attribute tag replaces a spread's attribute of its name, as Marko
// writes each attribute tag after the attributes (as nothing, if none is given).
const spread = { title: "a", req: ["x", "y"] };
const withReq = { req: { label: "a", *[Symbol.iterator]() {} } };
export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const Req = Marko._.hoist(() => __marko_internal_hoist__Req);
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@req"];
    input["@req"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@req"];
    input["@req"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
    // Repeated, one with params (left out of TypeScript's first check)
    {
      req: {
        ["content"]: (n) => {
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@req"];
    input["@req"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
    // Static, then possibly another
    {
      req: {
        ["content"]: (n) => {
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@req"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
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
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@req"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
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
  const __marko_internal_tag_1 = ReqMenu;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@req"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_1,
    Marko._.signature(__marko_internal_tag_1),
    Marko._.actualInput,
  )(
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
  const __marko_internal_tag_2 = flag ? ReqMenu : RMenu;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@req"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_2,
    Marko._.signature(__marko_internal_tag_2),
    Marko._.actualInput,
  )(
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
  {
    const Req = Marko._.returned(() => __marko_internal_rendered_3);
    const __marko_internal_rendered_3 = __marko_internal_module_2().default._({
      // By a <define> tag
      [Marko._.contentFor(__marko_internal_module_2)]: (input: {
        req: Marko.AttrTag<{ content?: Marko.Body }>;
      }) => {
        const __marko_internal_tag_4 = input.req.content;
        Marko._.renderDynamicTag(__marko_internal_tag_4)({});
        return Marko._.voidReturn;
      },
    });
    const __marko_internal_tag_5 = Req;
    Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
      input["@req"];
      input["@req"];
    });
    Marko._.renderDynamicTagWithRestAttrTags(
      __marko_internal_tag_5,
      Marko._.signature(__marko_internal_tag_5),
      Marko._.actualInput,
    )({
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
    const __marko_internal_tag_6 = Req;
    Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
      input["@req"];
    });
    Marko._.renderDynamicTagWithRestAttrTags(
      __marko_internal_tag_6,
      Marko._.signature(__marko_internal_tag_6),
      Marko._.actualInput,
    )({
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
    Marko._.attrTagNames(__marko_internal_module_1, (input) => {
      input["@req"];
      input["@req"];
    });
    __marko_internal_renderer_1(__marko_internal_module_1().default)(
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
    Marko._.attrTagNames(__marko_internal_module_3, (input) => {
      input["@req"];
      input["@req"];
    });
    __marko_internal_renderer_2(__marko_internal_module_3().default)(
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
    Marko._.attrTagNames(__marko_internal_module_3, (input) => {
      input["@req"];
    });
    __marko_internal_renderer_2(__marko_internal_module_3().default)({
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
    });
    Marko._.attrTagNames(__marko_internal_module_1, (input) => {
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
    __marko_internal_renderer_1(__marko_internal_module_1().default)(
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
    Marko._.attrTagNames(__marko_internal_module_1, (input) => {
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
    __marko_internal_renderer_1(__marko_internal_module_1().default)({
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: [1] as const,
          },
          () =>
            Marko._.attrTags(__marko_internal_module_1)([
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
    });
    Marko._.attrTagNames(__marko_internal_module_4, (input) => {
      input["@item"];
    });
    __marko_internal_renderer_3(__marko_internal_module_4().default)(
      // Required only in a <for> over an array literal
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: ["x", "y"],
            },
            (t) =>
              Marko._.attrTags(__marko_internal_module_4)([
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
    Marko._.attrTagNames(__marko_internal_module_4, (input) => {
      input["@item"];
    });
    __marko_internal_renderer_3(__marko_internal_module_4().default)(
      // Required only in a <for> over a non-empty const tuple
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: tuple,
            },
            (t) =>
              Marko._.attrTags(__marko_internal_module_4)([
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
    Marko._.attrTagNames(__marko_internal_module_4, (input) => {
      input["@item"];
    });
    __marko_internal_renderer_3(__marko_internal_module_4().default)(
      // Required only in a <for to=3>
      {
        [Marko._.restAttrTags]: [
          Marko._.forToAttrTag(
            {
              to: 3,
            },
            (i) =>
              Marko._.attrTags(__marko_internal_module_4)([
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
    Marko._.attrTagNames(__marko_internal_module_4, (input) => {
      input["@item"];
    });
    __marko_internal_renderer_3(__marko_internal_module_4().default)(
      // Required only in a <for> over a possibly empty list: given
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: cols,
            },
            (t) =>
              Marko._.attrTags(__marko_internal_module_4)([
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
    Marko._.attrTagNames(__marko_internal_module_5, (input) => {
      input["@section"];
      Marko._.nestedAttrTagNames(input["@section"], (input) => {
        input["@row"];
        input["@row"];
      });
    });
    __marko_internal_renderer_4(__marko_internal_module_5().default)(
      // Nested required, in an attribute tag in a loop
      {
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: [1, 2],
            },
            (i) =>
              Marko._.attrTags(__marko_internal_module_5)([
                {
                  section: {
                    ...Marko._.givenAttrTags("row"),
                    ...Marko._.attrTags(
                      __marko_internal_module_5,
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
    Marko._.attrTagNames(__marko_internal_module_5, (input) => {
      input["@section"];
      Marko._.nestedAttrTagNames(input["@section"], (input) => {
        input["@row"];
      });
    });
    __marko_internal_renderer_4(__marko_internal_module_5().default)({
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: [1, 2],
          },
          (i) =>
            Marko._.attrTags(__marko_internal_module_5)([
              {
                section: {
                  ...Marko._.givenAttrTags("row"),
                  ...Marko._.forOfAttrTag(
                    {
                      of: [i],
                    },
                    (j) =>
                      Marko._.attrTags(
                        __marko_internal_module_5,
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
    });
    Marko._.attrTagNames(__marko_internal_module_5, (input) => {
      input["@section"];
      Marko._.nestedAttrTagNames(input["@section"], (input) => {
        input["@row"];
        input["@row"];
      });
    });
    __marko_internal_renderer_4(__marko_internal_module_5().default)({
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: [1, 2],
          },
          (i) =>
            Marko._.attrTags(__marko_internal_module_5)([
              {
                section: {
                  ...Marko._.givenAttrTags("row"),
                  ...Marko._.attrTags(
                    __marko_internal_module_5,
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
    });
    Marko._.attrTagNames(__marko_internal_module_3, (input) => {
      input["@other"];
      input["@other"];
    });
    __marko_internal_renderer_2(__marko_internal_module_3().default)(
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
    Marko._.attrTagNames(__marko_internal_module_3, (input) => {
      input["@other"];
    });
    __marko_internal_renderer_2(__marko_internal_module_3().default)({
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (t) =>
            Marko._.attrTags(__marko_internal_module_3)([
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
    });
    Marko._.attrTagNames(__marko_internal_module_1, (input) => {
      input["@req"];
    });
    __marko_internal_renderer_1(__marko_internal_module_1().default)(
      // The spread's is not checked: a <for> gives it
      {
        ...spread,
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: tuple,
            },
            (label) =>
              Marko._.attrTags(__marko_internal_module_1)([
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
    Marko._.attrTagNames(__marko_internal_module_1, (input) => {
      input["@req"];
    });
    __marko_internal_renderer_1(__marko_internal_module_1().default)(
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
    Marko._.attrTagNames(__marko_internal_module_1, (input) => {
      input["@req"];
    });
    __marko_internal_renderer_1(__marko_internal_module_1().default)({
      ...withReq,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (label) =>
            Marko._.attrTags(__marko_internal_module_1)([
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
    });
    Marko._.attrTagNames(__marko_internal_module_1, (input) => {
      input["@req"];
    });
    __marko_internal_renderer_1(__marko_internal_module_1().default)(
      // The spread's other attributes are still checked => error
      {
        ...{ title: 1 },
        [Marko._.restAttrTags]: [
          Marko._.forOfAttrTag(
            {
              of: tuple,
            },
            (label) =>
              Marko._.attrTags(__marko_internal_module_1)([
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
    Marko._.attrTagNames(__marko_internal_module_1, (input) => {
      input["@req"];
      input["@req"];
    });
    __marko_internal_renderer_1(__marko_internal_module_1().default)(
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
    Marko._.attrTagNames(__marko_internal_module_1, (input) => {
      input["@req"];
    });
    __marko_internal_renderer_1(__marko_internal_module_1().default)(
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
              Marko._.attrTags(__marko_internal_module_1)([
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
    Marko._.attrTagNames(__marko_internal_module_5, (input) => {
      input["@section"];
      Marko._.nestedAttrTagNames(input["@section"], (input) => {
        input["@row"];
      });
    });
    __marko_internal_module_5().default._(
      // A required nested attribute tag given only in an <if> with a scriptlet, and
      // with its attribute tag in a <for>: given
      {
        section: {
          ...Marko._.givenAttrTags("row"),
          ...Marko._.attrTags(
            __marko_internal_module_5,
            "section",
          )([
            flag
              ? (() => {
                  const label = "a";
                  return Marko._.attrTags(
                    __marko_internal_module_5,
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
    Marko._.attrTagNames(__marko_internal_module_5, (input) => {
      input["@section"];
      Marko._.nestedAttrTagNames(input["@section"], (input) => {
        input["@row"];
      });
    });
    __marko_internal_renderer_4(__marko_internal_module_5().default)({
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: cols,
          },
          (label) =>
            Marko._.attrTags(__marko_internal_module_5)([
              {
                section: {
                  ...Marko._.givenAttrTags("row"),
                  ...Marko._.attrTags(
                    __marko_internal_module_5,
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
    });
    Marko._.attrTagNames(__marko_internal_module_6, (input) => {
      input["@header"];
    });
    __marko_internal_module_6().default._(
      // An attribute tag that requires `renderBody` is given its body by it
      {
        header: {
          [Marko._.contentFor(__marko_internal_module_6)]: Marko._.voidBody,
          [Symbol.iterator]: Marko._.any,
        },
      },
    );
    __marko_internal_module_7().default._(
      // A Tags API template is given its body as `content`, whatever its input
      // declares => error
      {
        ["content"]: Marko._.voidBody,
      },
    );
    __marko_internal_module_8().default._(
      // A Class API template's body is its `renderBody`, whatever else its input
      // declares
      {
        content: "a",
        [Marko._.contentFor(__marko_internal_module_8)]: Marko._.voidBody,
      },
    );
    __marko_internal_module_9().default._({
      value: 1,
      content: "a",
      [Marko._.contentFor(__marko_internal_module_9)]: (value) => {
        [value.toFixed()];
        return Marko._.voidReturn;
      },
    });
    const __marko_internal_tag_7 = GenericClassBody;
    Marko._.renderDynamicTag(__marko_internal_tag_7)({
      value: 1,
      content: "a",
      // And as a tag's value
      [Marko._.contentFor(__marko_internal_tag_7)]: (value) => {
        [value.toFixed()];
        return Marko._.voidReturn;
      },
    });
    const __marko_internal_tag_8 = GenericClassBody;
    Marko._.renderDynamicTag(__marko_internal_tag_8)({
      value: 1,
      content: "a",
      [Marko._.contentFor(__marko_internal_tag_8)]: (value) => {
        [value.toFixed()];
        return Marko._.voidReturn;
      },
    });
    __marko_internal_module_10().default._(
      // And a Tags API template's is its `content`, wherever it is => error
      {
        [Marko._.contentFor(__marko_internal_module_10)]: Marko._.voidBody,
      },
    );
    __marko_internal_module_11().default._(
      // A body given to a template that takes none is named by its key => error
      {
        [Marko._.contentFor(__marko_internal_module_11)]: Marko._.voidBody,
      },
    );
    var __marko_internal_hoist__Req = Req;
  }
  Marko._.noop({ Req, component, state, out, input, $global, $signal });
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("./tags/req-menu/index.marko");
declare function __marko_internal_module_2(): typeof import("@marko/runtime-tags/tags/define.d.marko");
declare function __marko_internal_module_3(): typeof import("./tags/idx-menu/index.marko");
declare function __marko_internal_module_4(): typeof import("./tags/rmenu/index.marko");
declare function __marko_internal_module_5(): typeof import("./tags/rgrid/index.marko");
declare function __marko_internal_module_6(): typeof import("./components/required-body-table.marko");
declare function __marko_internal_module_7(): typeof import("./tags/class-keyed-body/index.marko");
declare function __marko_internal_module_8(): typeof import("./components/class-content-attr.marko");
declare function __marko_internal_module_9(): typeof import("./components/generic-class-body.marko");
declare function __marko_internal_module_10(): typeof import("./components/tags-keyed-body.marko");
declare function __marko_internal_module_11(): typeof import("./components/class-no-body.marko");
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
function __marko_internal_renderer_2(
  template = __marko_internal_module_3().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
function __marko_internal_renderer_3(
  template = __marko_internal_module_4().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
function __marko_internal_renderer_4(
  template = __marko_internal_module_5().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
