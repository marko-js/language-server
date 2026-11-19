export interface Input {}
export type Component = Marko.Component<Input>;
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@menuitem"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)(
    Marko._.withRestAttrTags,
  )()({
    [Marko._.restAttrTags]: [
      Marko._.forOfAttrTag(
        {
          of: ["a", "b", "c"],
        },
        (name) =>
          Marko._.attrTags(__marko_internal_module_1)([
            {
              menuitem: {
                ["content"]: ({ foo }) => {
                  Marko._.renderNativeTag("div")({
                    [Marko._.content]: (() => {
                      [name];
                      [foo];
                      return Marko._.voidBody;
                    })(),
                  });
                  return Marko._.voidReturn;
                },
                [Symbol.iterator]: Marko._.any,
              },
            },
          ]),
      ),
    ],
    ...Marko._.givenAttrTags("menuitem"),
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@menuitem"];
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
    menuitem: {
      ["content"]: ({ foo }) => {
        Marko._.renderNativeTag("div")({
          [Marko._.content]: (() => {
            [foo];
            return Marko._.voidBody;
          })(),
        });
        return Marko._.voidReturn;
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./tags/my-menu/index.marko");
