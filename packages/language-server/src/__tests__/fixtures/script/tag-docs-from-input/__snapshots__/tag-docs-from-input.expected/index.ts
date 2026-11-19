export interface Input {}
export type Component = Marko.Component<Input>;
export default Marko._.template((input: Input) => {
  const component = Marko._.any as Component;
  const state = Marko._.state(component);
  const out = Marko._.any as Marko.Out;
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  __marko_internal_module_1().default._({
    label: "Go",
  });
  __marko_internal_module_2().default._(
    // ^?   ^?
    {
      label: "Go",
    },
  );
  __marko_internal_module_3().default._(
    //    ^?
    {},
  );
  __marko_internal_module_4().default._(
    //  ^?
    {
      items: [1, 2],
    },
  );
  __marko_internal_module_5().default._(
    //  ^?
    {},
  );
  const __marko_internal_tag_1 = Marko._.fallbackTemplate(
    // @ts-ignore
    ShinyButton,
    __marko_internal_module_6().default,
  );
  Marko._.renderDynamicTag(__marko_internal_tag_1)(
    //  ^?
    {},
  );
  __marko_internal_module_7().default._(
    //  ^?
    {
      start: 1,
    },
  );
  __marko_internal_module_8().default._(
    //  ^?
    {
      start: 1,
    },
  );
  __marko_internal_module_9().default._(
    //  ^?
    {},
  );
  __marko_internal_module_10().default._(
    //  ^?
    {
      label: "Go",
    },
  );
  __marko_internal_module_11().default._(
    //  ^?
    {
      label: "Go",
    },
  );
  __marko_internal_module_12().default._(
    //  ^?
    {},
  );
  __marko_internal_module_12().default._(
    //  ^?
    // Named again: its missing declaration is reported once, at the first tag.
    {},
  );
  Marko._.noop({ component, state, out, input, $global, $signal });
}, Marko.Component);
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
