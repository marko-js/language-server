import type { Input as ChildInput } from "../child/index.marko";
export interface Input extends ChildInput {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()(
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
  return;
})();
const __marko_internal_api = "tags";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input> {}
const Input = new Template();
export default Input;
declare function __marko_internal_module_1(): typeof import("../child/index.marko");
