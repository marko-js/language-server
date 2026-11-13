import type { Input as ChildInput } from "../child/index.marko";
export interface Input extends ChildInput {}
(function (this: void) {
  const input = Marko._.any as Input;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  const __marko_internal_tag_1 = Marko._.resolveTemplate(
    import("../child/index.marko"),
  ).default;
  Marko._.attrTagNames(__marko_internal_tag_1, (input) => {
    input["@item"];
  });
  Marko._.renderTemplate(__marko_internal_tag_1)(Marko._.withRestAttrTags)()(
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
            Marko._.attrTags(__marko_internal_tag_1)([
              {
                item: {
                  ...item,
                  extra: 1,
                  [Marko._.contentFor(__marko_internal_tag_1)]: ({ foo }) => {
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
