export interface Input {
  tab?: Marko.AttrTag<{
    href: string;
    title: string;
  }>;
  option: any;
}
export type Component = Marko.Component<Input>;
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.forOfTag(
    {
      of: input.tab,
    },
    ({ href, title }) => {
      Marko._.renderNativeTag("a")(
        // ^?
        {
          href: href,
          [Marko._.content]: (() => {
            [title];
            return Marko._.voidBody;
          })(),
        },
      );
      return Marko._.voidReturn;
    },
  );
  Marko._.renderNativeTag("select")({
    [Marko._.content]: (() => {
      Marko._.forOfTag(
        {
          of: input.option,
        },
        ({ value, content }) => {
          Marko._.renderNativeTag("option")(
            // ^?
            {
              value: value,
              [Marko._.content]: (() => {
                [content];
                return Marko._.voidBody;
              })(),
            },
          );
          return Marko._.voidReturn;
        },
      );
      return Marko._.voidBody;
    })(),
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@option"];
    input["@option"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: input.tab,
        },
        ({ href, title }) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              // ^?
              option: {
                value: href,
                [Marko._.contentFor(__marko_internal_module_1)]: (() => {
                  // ^?
                  [title];
                  return Marko._.voidBody;
                })(),
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
      Marko._.forOfAttrTag(
        {
          of: input.option,
        },
        ({ value, content }) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              // ^?
              option: {
                value: value,
                [Marko._.contentFor(__marko_internal_module_1)]: (() => {
                  // ^?
                  [content];
                  return Marko._.voidBody;
                })(),
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("option"),
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
const Input = new Template();
export default Input;
declare function __marko_internal_module_1(): typeof import("./components/my-select.marko");
