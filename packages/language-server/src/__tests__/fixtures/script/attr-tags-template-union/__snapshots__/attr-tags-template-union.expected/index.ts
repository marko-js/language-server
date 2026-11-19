import Flat from "./tags/flat/index.marko";
import Menu from "./tags/menu/index.marko";
import ClassMenu from "./components/class-menu.marko";
const flag = Math.random() > 0.5;
const FlatOrMenu = flag ? Flat : Menu;
// One of several native tags, which have no attribute tags
declare const native: "a" | "div";
export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const fromUnion = Marko._.hoist(() => __marko_internal_hoist__fromUnion);
  const __marko_internal_tag_1 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_1)(
    // One attribute tag
    {
      item: {
        size: "small",
        [Marko._.contentFor(__marko_internal_tag_1, "item")]: ({ foo }) => {
          [foo];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  const __marko_internal_tag_2 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_2,
    Marko._.signature(__marko_internal_tag_2),
    Marko._.actualInput,
  )(
    // Repeated
    {
      item: {
        size: "small",
        [Marko._.contentFor(__marko_internal_tag_2, "item")]: ({ foo }) => {
          [foo];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          //                               ^?
          item: {
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    },
  );
  const __marko_internal_tag_3 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_3, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_3,
    Marko._.signature(__marko_internal_tag_3),
    Marko._.actualInput,
  )(
    // In an if
    {
      [Marko._.restAttrTags]: [
        flag
          ? {
              item: {
                size: "small",
                [Marko._.contentFor(__marko_internal_tag_3, "item")]: ({
                  foo,
                }) => {
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
  const __marko_internal_tag_4 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_4,
    Marko._.signature(__marko_internal_tag_4),
    Marko._.actualInput,
  )(
    // In a for
    {
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: [1, 2],
          },
          (i) =>
            Marko._.attrTags(__marko_internal_tag_4)([
              {
                item: {
                  size: "small",
                  [Marko._.contentFor(__marko_internal_tag_4, "item")]: ({
                    foo,
                  }) => {
                    [i];
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
  const __marko_internal_tag_5 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_5, (input) => {
    input["@item"];
    Marko._.nestedAttrTagNames(input["@item"], (input) => {
      input["@row"];
      input["@row"];
    });
  });
  Marko._.renderDynamicTag(__marko_internal_tag_5)(
    // Nested, repeated
    {
      item: {
        ...Marko._.givenAttrTags("row"),
        ...Marko._.attrTags(
          __marko_internal_tag_5,
          "item",
        )([
          {
            row: {
              [Marko._.contentFor(__marko_internal_tag_5, "item", "row")]: ({
                bar,
              }) => {
                [bar];
                return Marko._.voidReturn;
              },
              [Symbol.iterator]: Marko._.any,
            },
          },
          {
            //                   ^?
            row: {
              [Symbol.iterator]: Marko._.any,
            },
          },
        ]),
        [Symbol.iterator]: Marko._.any,
      },
    },
  );
  const __marko_internal_tag_6 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_6,
    Marko._.signature(__marko_internal_tag_6),
    Marko._.actualInput,
  )(
    // Wrong values
    {
      item: {
        size: "huge",
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
  const __marko_internal_tag_7 = FlatOrMenu;
  Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
    input["@item"];
    input["@item"];
  });
  const __marko_internal_rendered_7 = Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_7,
    Marko._.signature(__marko_internal_tag_7),
    Marko._.actualInput,
  )(
    // Hoisted from a rest attribute tag
    {
      item: {
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        flag
          ? {
              item: {
                [Marko._.contentFor(__marko_internal_tag_7, "item")]: (() => {
                  {
                    const fromUnion = Marko._.returned(
                      () => __marko_internal_rendered_8,
                    );
                    const __marko_internal_rendered_8 =
                      __marko_internal_module_1().default._({
                        value: () => "union" as const,
                      });
                    return () => {
                      return new (class MarkoReturn<Return = void> {
                        readonly [Marko._.scope] = { fromUnion };
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
  __marko_internal_module_2().default._({
    async value() {
      fromUnion;
      // ^?
    },
  });
  const __marko_internal_tag_9 = native;
  Marko._.attrTagNames(__marko_internal_tag_9, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_9,
    Marko._.signature(__marko_internal_tag_9),
    Marko._.actualInput,
  )({
    item: {
      [Symbol.iterator]: Marko._.any,
    },
    [Marko._.restAttrTags]: [
      {
        item: {
          [Symbol.iterator]: Marko._.any,
        },
      },
    ],
  });
  const __marko_internal_tag_10 = flag ? ClassMenu : "div";
  Marko._.attrTagNames(__marko_internal_tag_10, (input) => {
    input["@item"];
  });
  Marko._.renderDynamicTagWithRestAttrTags(
    __marko_internal_tag_10,
    Marko._.signature(__marko_internal_tag_10),
    Marko._.actualInput,
  )(
    // A template or a native tag: typed by the template (where both name their
    // content alike; `Menu`'s is `content`, a native tag's here `renderBody`)
    {
      [Marko._.restAttrTags]: [
        flag
          ? {
              item: {
                label: "a",
                [Marko._.contentFor(__marko_internal_tag_10, "item")]: (n) => {
                  [n];
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
  var { fromUnion: __marko_internal_hoist__fromUnion } = Marko._.hoisted(
    Marko._.readScope(__marko_internal_rendered_7),
  );
  Marko._.noop({ fromUnion, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/const.d.marko");
declare function __marko_internal_module_2(): typeof import("marko/src/core-tags/core/script.d.marko");
