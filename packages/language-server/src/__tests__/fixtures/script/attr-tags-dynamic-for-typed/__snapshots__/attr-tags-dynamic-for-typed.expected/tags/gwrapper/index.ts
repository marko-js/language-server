import type { Input as ChildInput } from "../gchild/index.marko";
export interface Input<T> extends ChildInput<T> {}
const Input = Marko._.templateOf(<T,>(input: Input<T>) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
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
                  ["content"]: (row) => {
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
});
export default Input;
declare function __marko_internal_module_1(): typeof import("../gchild/index.marko");
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
