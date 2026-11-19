export interface Input {
  content: Marko.Body<[{ title: string; count?: number }]>;
  pair: Marko.Body<[a: string, b: number]>;
  plain: Marko.Body;
}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const Card = Marko._.hoist(() => __marko_internal_hoist__Card);
  const __marko_internal_tag_1 = input.content;
  Marko._.renderDynamicTag(__marko_internal_tag_1)(
    // A body whose only param is its input is given attributes, checked as a
    // tag's are.
    {
      title: "a",
      count: 1,
    },
  );
  const __marko_internal_tag_2 = input.content;
  Marko._.renderDynamicTag(__marko_internal_tag_2)(
    //                ^?
    {
      title: 1,
    },
  );
  const __marko_internal_tag_3 = input.content;
  Marko._.renderDynamicTag(__marko_internal_tag_3)({
    title: "a",
    bogus: 1,
  });
  const __marko_internal_tag_4 = input.content;
  Marko._.renderDynamicTag(__marko_internal_tag_4)({});
  const __marko_internal_tag_5 = input.pair;
  Marko._.renderDynamicTag(__marko_internal_tag_5)(
    // A body with other params is given arguments.
    "a",
    1,
  );
  const __marko_internal_tag_6 = input.pair;
  Marko._.renderDynamicTag(__marko_internal_tag_6)("a", "b");
  const __marko_internal_tag_7 = input.pair;
  Marko._.renderDynamicTag(__marko_internal_tag_7)("a");
  const __marko_internal_tag_8 = input.plain;
  Marko._.renderDynamicTag(__marko_internal_tag_8)(
    // A body with no params takes nothing.
    {},
  );
  const __marko_internal_tag_9 = input.plain;
  Marko._.renderDynamicTag(__marko_internal_tag_9)({
    bogus: 1,
  });
  {
    const Card = Marko._.returned(() => __marko_internal_rendered_10);
    const __marko_internal_rendered_10 = __marko_internal_module_1().default._({
      // A <define> with attributes is such a body too. (Its attributes are not
      [Marko._.contentFor(__marko_internal_module_1)]:
        // checked in this fixture, which is typed with Marko 5: its body is `content`,
        // not the `renderBody` read here. They are checked in a Marko 6 project.)
        ({ heading, size }: { heading: string; size?: number }) => {
          [heading];
          [size];
          return Marko._.voidReturn;
        },
    });
    const __marko_internal_tag_11 = Card;
    Marko._.renderDynamicTag(__marko_internal_tag_11)({
      heading: "a",
      size: 1,
    });
    const __marko_internal_tag_12 = Card;
    Marko._.renderDynamicTag(__marko_internal_tag_12)(
      //    ^?
      {
        heading: 1,
      },
    );
    const __marko_internal_tag_13 = Card;
    Marko._.renderDynamicTag(__marko_internal_tag_13)({
      heading: "a",
      bogus: 1,
    });
    const __marko_internal_tag_14 = Card;
    Marko._.renderDynamicTag(__marko_internal_tag_14)({});
    var __marko_internal_hoist__Card = Card;
  }
  Marko._.noop({ Card, input, $global, $signal });
});
export default Input;
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/define.d.marko");
