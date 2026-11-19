export interface Input {}
export type Component = Marko.Component<Input>;
(function (this: void) {
  const input = Marko._.any as Input;
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  Marko._.renderTemplate(__marko_internal_module_1().default)()()({
    label: "Go",
  });
  Marko._.renderTemplate(__marko_internal_module_2().default)()()(
    // ^?   ^?
    {
      label: "Go",
    },
  );
  Marko._.renderTemplate(__marko_internal_module_3().default)()()(
    //    ^?
    {},
  );
  Marko._.renderTemplate(__marko_internal_module_4().default)()()(
    //  ^?
    {
      items: [1, 2],
    },
  );
  Marko._.renderTemplate(__marko_internal_module_5().default)()()(
    //  ^?
    {},
  );
  const __marko_internal_tag_1 = Marko._.fallbackTemplate(
    // @ts-ignore
    ShinyButton,
    __marko_internal_module_6().default,
  );
  Marko._.renderDynamicTag(__marko_internal_tag_1)()()(
    //  ^?
    {},
  );
  Marko._.renderTemplate(__marko_internal_module_7().default)()()(
    //  ^?
    {
      start: 1,
    },
  );
  Marko._.renderTemplate(__marko_internal_module_8().default)()()(
    //  ^?
    {
      start: 1,
    },
  );
  Marko._.renderTemplate(__marko_internal_module_9().default)()()(
    //  ^?
    {},
  );
  Marko._.renderTemplate(__marko_internal_module_10().default)()()(
    //  ^?
    {
      label: "Go",
    },
  );
  Marko._.renderTemplate(__marko_internal_module_11().default)()()(
    //  ^?
    {
      label: "Go",
    },
  );
  Marko._.renderTemplate(__marko_internal_module_12().default)()()(
    //  ^?
    {},
  );
  Marko._.renderTemplate(__marko_internal_module_12().default)()()(
    //  ^?
    // Named again: its missing declaration is reported once, at the first tag.
    {},
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
  return;
})();
const __marko_internal_api = "class";
export { __marko_internal_api as "~api" };
class Template extends Marko._.Template<Input, void, "class"> {}
export default new Template();
declare function __marko_internal_module_1(): typeof import("./components/fancy-button.marko");
declare function __marko_internal_module_2(): typeof import("./components/plain-button.marko");
declare function __marko_internal_module_3(): typeof import("./components/no-input.marko");
declare function __marko_internal_module_4(): typeof import("./components/generic-list.marko");
declare function __marko_internal_module_5(): typeof import("./components/dir-button/index.marko");
declare function __marko_internal_module_6(): typeof import("./components/ShinyButton.marko");
declare function __marko_internal_module_7(): typeof import("./components/class-counter.marko");
declare function __marko_internal_module_8(): typeof import("./tags/tags-counter.marko");
declare function __marko_internal_module_9(): typeof import("./lib/button-impl.marko");
declare function __marko_internal_module_10(): typeof import("./lib/typed-button.d.marko");
declare function __marko_internal_module_11(): typeof import("./components/split-button/index.marko");
declare function __marko_internal_module_12(): typeof import("./lib/missing-types-button.d.marko");
