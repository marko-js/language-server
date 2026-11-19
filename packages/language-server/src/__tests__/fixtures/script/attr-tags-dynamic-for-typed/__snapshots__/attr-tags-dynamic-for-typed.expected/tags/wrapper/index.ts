import type { Input as ChildInput } from "../child/index.marko";
export interface Input extends ChildInput {}
const Input: Marko.Template<Input, void> = Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)(
    // Spreads its input and gives each item again, with another attribute: clean,
    // the body params typed
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
                  extra: 1,
                  ["content"]: ({ foo }) => {
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
  Marko._.noop({ input, $global, $signal });
});
export default Input;
declare function __marko_internal_module_1(): typeof import("../child/index.marko");
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
