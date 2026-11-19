export interface Input<T extends Marko.Template> {
  tag: T;
}
// As a template of the constraint's type
declare const Tag: Marko.Template;
export type Component<T extends Marko.Template> = Marko.Component<Input<T>>;
const Input = Marko._.templateOf(
  <T extends Marko.Template>(input: Input<T>) => {
    const component = Marko._.any as Component<T>;
    const state = Marko._.state(component);
    const out = Marko._.any as Marko.Out;
    const $signal = Marko._.any as AbortSignal;
    const $global = Marko._.any as Marko.Global;
    const __marko_internal_tag_1 = input.tag;
    Marko._.renderDynamicTag(__marko_internal_tag_1)({
      foo: 1,
      [Marko._.contentFor(__marko_internal_tag_1)]: Marko._.voidBody,
    });
    const __marko_internal_tag_2 = input.tag;
    Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
      input["@item"];
      input["@item"];
    });
    Marko._.renderDynamicTagWithRestAttrTags(
      __marko_internal_tag_2,
      Marko._.signature(__marko_internal_tag_2),
      Marko._.actualInput,
    )({
      item: {
        x: 1,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          item: {
            x: 2,
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    });
    const __marko_internal_tag_3 = Tag;
    Marko._.renderDynamicTag(__marko_internal_tag_3)({
      foo: 1,
      [Marko._.contentFor(__marko_internal_tag_3)]: Marko._.voidBody,
    });
    const __marko_internal_tag_4 = Tag;
    Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
      input["@item"];
      input["@item"];
    });
    Marko._.renderDynamicTagWithRestAttrTags(
      __marko_internal_tag_4,
      Marko._.signature(__marko_internal_tag_4),
      Marko._.actualInput,
    )({
      item: {
        x: 1,
        [Symbol.iterator]: Marko._.any,
      },
      [Marko._.restAttrTags]: [
        {
          item: {
            x: 2,
            [Symbol.iterator]: Marko._.any,
          },
        },
      ],
    });
    Marko._.noop({ component, state, out, input, $global, $signal });
  },
  Marko.Component,
);
export default Input;
