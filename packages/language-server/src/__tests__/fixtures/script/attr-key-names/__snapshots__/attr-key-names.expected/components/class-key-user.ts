// In the Class API, Marko 5's directives are not a tag's input: they are
// checked apart.
export interface Input {}
abstract class Component extends Marko.Component<Input> {}
export { type Component };
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.getGlobal(
    // @ts-expect-error We expect the compiler to error because we are checking if the MarkoRun.Context is defined.
    (Marko._.error, Marko._.any as MarkoRun.Context),
  );
  Marko._.forOfTag(
    {
      of: [{ id: "a" }],
    },
    (row) => {
      Marko._.renderTemplate(__marko_internal_module_1().default)()()({
        class: "c",
      });
      Marko._.directives({
        key: `row-${row.id}`,
        "no-update": true,
      });
      return Marko._.voidReturn;
    },
  );
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({});
  Marko._.directives({
    key: 1,
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)()()(
    // A directive's modifier after a `:` is dropped: `key:scoped` is `key`.
    {},
  );
  Marko._.directives({
    key: 1,
  });
  Marko._.renderTemplate(__marko_internal_module_1().default)()()(
    //       ^?
    // Names that only start like a directive's are attributes.
    {
      keyboard: "k",
    },
  );
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
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
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()({});
  Marko._.directives({
    key: "s",
    "no-update-body": true,
  });
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
const ClassKeyUser = new Template();
export default ClassKeyUser;
declare function __marko_internal_module_1(): typeof import("./key-tag.marko");
