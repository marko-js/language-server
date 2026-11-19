export interface Input {}
export default Marko._.template((input: Input) => {
  const $signal = Marko._.any as AbortSignal;
  const $global = Marko._.any as Marko.Global;
  const count = Marko._.hoist(() => __marko_internal_hoist__count);
  {
    const count = Marko._.returned(() => __marko_internal_rendered_1);
    const __marko_internal_rendered_1 = __marko_internal_module_1().default._({
      value: 0,
    });
    const __marko_internal_change__count = Marko._.change(
      "count",
      "value",
      __marko_internal_rendered_1,
    );
    Marko._.attrTagNames(__marko_internal_module_2, (input) => {
      input["@my-item"];
      input["@item"];
    });
    __marko_internal_module_2().default._({
      "aria-label": "Hi",
      class: "a",
      for: "b",
      default: 1,
      value: count,
      valueChange(
        // @ts-ignore
        _count,
      ) {
        __marko_internal_change__count.count = _count;
      },
      "data-count": 2,
      //       ^?              ^?        ^?      ^?        ^?           ^?
      "my-item": {
        label: "x",
        [Symbol.iterator]: Marko._.any,
      },
      //  ^?
      item: {
        label: "y",
        [Symbol.iterator]: Marko._.any,
      },
    });
    __marko_internal_module_2().default._({
      "bogus-key": 1,
    });
    __marko_internal_module_2().default._({
      bogus: 1,
    });
    __marko_internal_module_2().default._({
      default: "x",
    });
    Marko._.attrTagNames(__marko_internal_module_2, (input) => {
      input["@itme"];
    });
    __marko_internal_module_2().default._({
      itme: {
        label: "z",
        [Symbol.iterator]: Marko._.any,
      },
    });
    Marko._.attrTagNames(__marko_internal_module_2, (input) => {
      input["@my-itme"];
    });
    __marko_internal_module_2().default._({
      "my-itme": {
        label: "z",
        [Symbol.iterator]: Marko._.any,
      },
    });
    __marko_internal_module_2().default._(
      // The Tags API has no directives: `key` is an attribute, passed to the input.
      {
        key: "row-1",
      },
    );
    __marko_internal_module_2().default._(
      //       ^?
      {
        "no-update": true,
      },
    );
    var __marko_internal_hoist__count = count;
  }
  Marko._.noop({ count, input, $global, $signal });
});
declare function __marko_internal_module_1(): typeof import("@marko/runtime-tags/tags/let.d.marko");
declare function __marko_internal_module_2(): typeof import("./components/key-tag.marko");
