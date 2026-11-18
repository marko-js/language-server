import type { Input as ChildInput } from "../gchild/index.marko";
export interface Input<T> extends ChildInput<T> {}
(function <T>(this: void) {
  const input = Marko._.any as Input<T>;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
    // A generic one: clean, the body params typed by its type parameter
    {
      ...input,
      [Marko._.restAttrTags]: [
        Marko._.forOfAttrTag(
          {
            of: input.item,
          },
          (item) =>
            Marko._.attrTags(__marko_internal_module_1)([
              {
                item: {
                  ...item,
                  label: "x",
                  [Marko._.contentFor(__marko_internal_module_1)]: (row) => {
                    [row];
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
          input: Input<T> & Marko._.Relate<__marko_internal_input, Input<T>>,
        ) => Marko._.ReturnWithScope<__marko_internal_input, void>
      : () => <__marko_internal_input, T>(
          input: Marko._.TagInput<__marko_internal_input, Input<T>>,
        ) => Marko._.ReturnWithRestAttrTagsScope<__marko_internal_input, void>
> {}
const Input = new Template();
export default Input;
declare function __marko_internal_module_1(): typeof import("../gchild/index.marko");
