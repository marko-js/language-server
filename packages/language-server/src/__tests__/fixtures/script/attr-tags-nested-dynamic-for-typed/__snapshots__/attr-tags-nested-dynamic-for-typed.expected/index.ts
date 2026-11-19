export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@section"];
    Marko._.nestedAttrTagNames(input["@section"], (input) => {
      input["@item"];
    });
  });
  __marko_internal_module_1().default._({
    section: {
      ...Marko._.givenAttrTags("item"),
      ...Marko._.forOfAttrTag(
        {
          of: ["a", "b", "c"],
        },
        (name) =>
          Marko._.attrTags(
            __marko_internal_module_1,
            "section",
          )([
            {
              item: {
                ["content"]: ({ label }) => {
                  Marko._.renderNativeTag("div")({
                    [Marko._.content]: (() => {
                      [name];
                      [label];
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
      [Symbol.iterator]: Marko._.any,
    },
  });
  Marko._.attrTagNames(__marko_internal_module_1, (input) => {
    input["@section"];
    Marko._.nestedAttrTagNames(input["@section"], (input) => {
      input["@item"];
    });
  });
  __marko_internal_module_1().default._({
    section: {
      item: {
        ["content"]: ({ label }) => {
          Marko._.renderNativeTag("div")({
            [Marko._.content]: (() => {
              [label];
              return Marko._.voidBody;
            })(),
          });
          return Marko._.voidReturn;
        },
        [Symbol.iterator]: Marko._.any,
      },
      [Symbol.iterator]: Marko._.any,
    },
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
declare function __marko_internal_module_1(): typeof import("./tags/my-layout/index.marko");
