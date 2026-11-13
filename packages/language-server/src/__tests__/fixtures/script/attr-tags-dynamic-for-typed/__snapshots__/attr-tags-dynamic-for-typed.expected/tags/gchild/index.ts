export interface Input<T> {
  rows: T[];
  item?: Marko.AttrTag<{ label?: string; content?: Marko.Body<[T]> }>;
}
(function <T>(this: void) {
  const input = Marko._.any as Input<T>;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.forOfTag(
    {
      of: input.rows,
    },
    (row) => {
      Marko._.forOfTag(
        {
          of: input.item,
        },
        (item) => {
          const __marko_internal_tag_1 = item.content;
          Marko._.renderDynamicTag(__marko_internal_tag_1)()()(row);
          return Marko._.voidReturn;
        },
      );
      return Marko._.voidReturn;
    },
  );
  Marko._.noop({ input, $global, $signal });
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.GenericTemplate<
  {
    [__marko_internal_key in keyof Marko._.TemplateMethods]: <T>(
      ...args: Marko._.MethodParams<Input<T>, void, __marko_internal_key>
    ) => Marko._.MethodReturn<Input<T>, void, __marko_internal_key>;
  } & { [Marko._.anyInput]: Input<any> },
  <__marko_internal_apply = 1>(
    m?: __marko_internal_apply,
  ) => __marko_internal_apply extends 0 | 2
    ? <T>() => Marko._.Renderer<Input<T>, void, __marko_internal_apply>
    : __marko_internal_apply extends 1
      ? () => <__marko_internal_input, T>(
          input: Marko.Directives &
            Input<T> &
            Marko._.Relate<__marko_internal_input, Marko.Directives & Input<T>>,
        ) => Marko._.ReturnWithScope<__marko_internal_input, void>
      : () => <__marko_internal_input, T>(
          input: Marko._.TagInput<__marko_internal_input, Input<T>>,
        ) => Marko._.ReturnWithRestAttrTagsScope<__marko_internal_input, void>
> {}
const Input = new Template();
export default Input;
