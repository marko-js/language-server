// In the Class API, Marko 5's directives are not a tag's input: they are
// checked apart.
export interface Input {}
class Component extends Marko.Component<Input> {}
export { type Component };
const ClassKeyUser: Marko.Template<Input, void> & {
  Component: typeof Component;
} = Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.forOfTag(
    {
      of: [{ id: "a" }],
    },
    (row) => {
      __marko_internal_module_1().default._({
        class: "c",
      });
      Marko._.directives({
        key: `row-${row.id}`,
        "no-update": true,
      });
      return Marko._.voidReturn;
    },
  );
  __marko_internal_module_1().default._({});
  Marko._.directives({
    key: 1,
  });
  __marko_internal_module_1().default._(
    // A directive's modifier after a `:` is dropped: `key:scoped` is `key`.
    {},
  );
  Marko._.directives({
    key: 1,
  });
  __marko_internal_module_1().default._(
    //       ^?
    // Names that only start like a directive's are attributes.
    {
      keyboard: "k",
    },
  );
  __marko_internal_module_1().default._({
    "no-update-x": 1,
  });
  Marko._.renderNativeTag("div")(
    // A native tag's directives are checked apart too, and a dynamic tag's.
    {
      class: "d",
    },
  );
  Marko._.directives({
    key: "el",
    "no-update-if": true,
  });
  Marko._.renderNativeTag("div")(
    //   ^?
    {},
  );
  Marko._.directives({
    key: {},
  });
  const __marko_internal_tag_1 = "span";
  Marko._.renderDynamicTag(__marko_internal_tag_1)({});
  Marko._.directives({
    key: "s",
    "no-update-body": true,
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Component);
export default ClassKeyUser;
declare function __marko_internal_module_1(): typeof import("./key-tag.marko");
