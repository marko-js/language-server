export interface Input<T extends Marko.Template> {
  tag: T;
}
// As a template of the constraint's type
declare const Tag: Marko.Template;
export type Component<T extends Marko.Template> = Marko.Component<Input<T>>;
(function <T extends Marko.Template>(this: void) {
  const input = Marko._.any as Input<T>;
  const component = Marko._.any as Component<T>;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const __marko_internal_tag_1 = input.tag;
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()({
    foo: 1,
    [Marko._.contentFor(__marko_internal_tag_1)]: Marko._.voidBody,
  });
  const __marko_internal_tag_2 = input.tag;
  Marko._.attrTagNames(__marko_internal_tag_2, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_2)(Marko._.withRestAttrTags)()({
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
  Marko._.renderDynamicTag(__marko_internal_tag_3)()()({
    foo: 1,
    [Marko._.contentFor(__marko_internal_tag_3)]: Marko._.voidBody,
  });
  const __marko_internal_tag_4 = Tag;
  Marko._.attrTagNames(__marko_internal_tag_4, (input) => {
    input["@item"];
    input["@item"];
  });
  Marko._.renderDynamicTag(__marko_internal_tag_4)(Marko._.withRestAttrTags)()({
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
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.GenericTemplate<
  {
    [__marko_internal_key in keyof Marko._.TemplateMethods]: <
      T extends Marko.Template,
    >(
      ...args: Marko._.MethodParams<Input<T>, void, __marko_internal_key>
    ) => Marko._.MethodReturn<Input<T>, void, __marko_internal_key>;
  } & { [Marko._.anyInput]: Input<any> },
  <__marko_internal_apply = 1>(
    m?: __marko_internal_apply,
  ) => __marko_internal_apply extends 0 | 2
    ? <T extends Marko.Template>() => Marko._.Renderer<
        Input<T>,
        void,
        __marko_internal_apply
      >
    : __marko_internal_apply extends 1
      ? () => <__marko_internal_input, T extends Marko.Template>(
          input: Input<T> & Marko._.Relate<__marko_internal_input, Input<T>>,
        ) => Marko._.ReturnWithScope<__marko_internal_input, void>
      : () => <__marko_internal_input, T extends Marko.Template>(
          input: Marko._.TagInput<__marko_internal_input, Input<T>>,
        ) => Marko._.ReturnWithRestAttrTagsScope<__marko_internal_input, void>,
  "class"
> {}
const Input = new Template();
export default Input;
