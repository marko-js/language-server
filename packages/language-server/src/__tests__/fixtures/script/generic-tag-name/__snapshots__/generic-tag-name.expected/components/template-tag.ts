export interface Input<
  T extends Marko.Template<
    {
      value: string;
      item?: Marko.AttrTag<{
        x: number;
        renderBody?: Marko.Body<[{ y: number }]>;
      }>;
    },
    void
  >,
> {
  tag: T;
}
// As a template of the constraint's type
declare const Tag: Marko.Template<
  {
    value: string;
    item?: Marko.AttrTag<{
      x: number;
      renderBody?: Marko.Body<[{ y: number }]>;
    }>;
  },
  void
>;
export type Component<
  T extends Marko.Template<
    {
      value: string;
      item?: Marko.AttrTag<{
        x: number;
        renderBody?: Marko.Body<[{ y: number }]>;
      }>;
    },
    void
  >,
> = Marko.Component<Input<T>>;
const Input = Marko._.templateOf(
  <
    T extends Marko.Template<
      {
        value: string;
        item?: Marko.AttrTag<{
          x: number;
          renderBody?: Marko.Body<[{ y: number }]>;
        }>;
      },
      void
    >,
  >(
    input: Input<T>,
  ) => {
    const component = Marko._.any as Component<T>;
    const state = Marko._.state(component);
    const out = Marko._.any as Marko.Out;
    const $signal = Marko._.any as AbortSignal;
    const $global = Marko._.any as Marko.Global;
    const __marko_internal_tag_1 = input.tag;
    Marko._.renderDynamicTag(__marko_internal_tag_1)({
      value: "x",
    });
    const __marko_internal_tag_2 = input.tag;
    Marko._.renderDynamicTag(__marko_internal_tag_2)({
      value: 1,
    });
    const __marko_internal_tag_3 = input.tag;
    Marko._.renderDynamicTag(__marko_internal_tag_3)({
      value: "x",
      bogus: 1,
    });
    const __marko_internal_tag_4 = input.tag;
    Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
      input["@item"];
      input["@item"];
    });
    Marko._.renderDynamicTagWithRestAttrTags(
      __marko_internal_tag_4,
      Marko._.signature(__marko_internal_tag_4),
      Marko._.actualInput,
    )({
      value: "x",
      item: {
        x: 1,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          item: {
            x: "2",
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    });
    const __marko_internal_tag_5 = Tag;
    Marko._.renderDynamicTag(__marko_internal_tag_5)({
      value: "x",
      bogus: 1,
    });
    const __marko_internal_tag_6 = Tag;
    Marko._.attrTagNames(__marko_internal_tag_6, (input) => {
      input["@item"];
      input["@item"];
    });
    Marko._.renderDynamicTagWithRestAttrTags(
      __marko_internal_tag_6,
      Marko._.signature(__marko_internal_tag_6),
      Marko._.actualInput,
    )({
      value: "x",
      item: {
        x: 1,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          item: {
            x: "2",
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    });
    const __marko_internal_tag_7 = input.tag;
    Marko._.attrTagNames(__marko_internal_tag_7, (input) => {
      input["@item"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_7)(
      // Content params by the constraint
      {
        value: "x",
        item: {
          x: 1,
          [Marko._.contentFor(__marko_internal_tag_7, "item")]: ({ y }) => {
            [y.toFixed()];
            return Marko._.voidReturn;
          },
          [Symbol.iterator]: Marko._.any,
        },
      },
    );
    const __marko_internal_tag_8 = Tag;
    Marko._.attrTagNames(__marko_internal_tag_8, (input) => {
      input["@item"];
    });
    Marko._.renderDynamicTag(__marko_internal_tag_8)({
      value: "x",
      item: {
        x: 1,
        [Marko._.contentFor(__marko_internal_tag_8, "item")]: ({ y }) => {
          [y.toFixed()];
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
    });
    Marko._.noop({ component, state, out, input, $global, $signal });
  },
  Marko.Component,
);
export default Input;
