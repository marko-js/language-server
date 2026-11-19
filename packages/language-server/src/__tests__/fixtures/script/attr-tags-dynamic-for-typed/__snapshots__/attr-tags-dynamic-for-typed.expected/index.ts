export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@menuitem"];
  });
  __marko_internal_renderer_1(__marko_internal_module_1().default)({
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
  __marko_internal_module_1().default._({
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
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("./tags/my-menu/index.marko");
function __marko_internal_renderer_1(
  template = __marko_internal_module_1().default,
) {
  return Marko._.restAttrTagsRenderer(template._, Marko._.actualInput);
}
